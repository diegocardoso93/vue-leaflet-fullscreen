<template><span></span></template>

<script setup>
import { loadScreenfull, loadLeafletFullScreen } from "./leaflet-fullscreen";

import { toRefs, inject, watch } from "vue";

const WINDOW_OR_GLOBAL =
  (typeof self === "object" && self.self === self && self) ||
  (typeof global === "object" && global.global === global && global) ||
  undefined;

const props = defineProps(["mapRef", "position"]);
const { mapRef, position } = toRefs(props);

const useGlobalLeaflet = inject("useGlobalLeaflet");

watch(mapRef, async (map) => {
  if (mapRef.value) {
    const L = useGlobalLeaflet
      ? WINDOW_OR_GLOBAL.L
      : await import("leaflet/dist/leaflet-src.esm");

    loadLeafletFullScreen(L, loadScreenfull());

    new L.Control.FullScreen({ position: position.value || "topleft" }).addTo(
      map
    );
  }
});
</script>

<style>
.leaflet-fullscreen-icon {
  background-image: url("../assets/icon-fullscreen.svg");
  background-size: 26px 52px;
}
.leaflet-fullscreen-icon.leaflet-fullscreen-on {
  background-position: 0 -26px;
}
.leaflet-touch .leaflet-fullscreen-icon {
  background-position: 2px 2px;
}
.leaflet-touch .leaflet-fullscreen-icon.leaflet-fullscreen-on {
  background-position: 2px -24px;
}
/* one selector per rule as explained here : http://www.sitepoint.com/html5-full-screen-api/ */
.leaflet-container:-webkit-full-screen {
  width: 100% !important;
  height: 100% !important;
  z-index: 99999;
}
.leaflet-container:-ms-fullscreen {
  width: 100% !important;
  height: 100% !important;
  z-index: 99999;
}
.leaflet-container:full-screen {
  width: 100% !important;
  height: 100% !important;
  z-index: 99999;
}
.leaflet-container:fullscreen {
  width: 100% !important;
  height: 100% !important;
  z-index: 99999;
}
.leaflet-pseudo-fullscreen {
  position: fixed !important;
  width: 100% !important;
  height: 100% !important;
  top: 0px !important;
  left: 0px !important;
  z-index: 99999;
}
</style>

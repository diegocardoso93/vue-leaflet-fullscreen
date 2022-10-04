# vue-leaflet-fullscreen
FullScreen control for vue-leaflet
based on https://github.com/brunob/leaflet.fullscreen

## Usage

- inside template l-map add
```javascript

<l-map :maxZoom="17" @ready="onMapReady" :use-global-leaflet="true">
  ...
  <l-full-screen :mapRef="mapRef" />
  ...
</l-map>
```

- in script setup section, create import and ref to map
```javascript
<script setup>
import { ref } from "vue";
import { LMap } from "@vue-leaflet/vue-leaflet";
import LFullScreen from "vue-leaflet-fullscreen";

import "leaflet/dist/leaflet.css";
import "vue-leaflet-fullscreen/dist/style.css";

const mapRef = ref();

function onMapReady(map) {
  mapRef.value = map;
}
</script>
```

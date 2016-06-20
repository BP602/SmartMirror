<template>
  <div class="note">
    <h1>{{note.Title}}</h1>
    <pre>{{note.Content}}</pre>
  </div>
</template>

<script>
export default {
  props: ['note']
}
</script>
<script context="module">
  import { Router, createRouter } from '@roxi/routify'
  import routes from '../.routify/routes.default.js'
  import "bootstrap-icons/font/bootstrap-icons.min.css";
  const rtlUrl = new URL('bootstrap/dist/css/bootstrap.rtl.min.css', import.meta.url).href;
  const ltrUrl = new URL('bootstrap/dist/css/bootstrap.min.css', import.meta.url).href;

  const router = createRouter({ routes })
</script>

<script lang="ts">
  import { setupI18n, dir } from "./i18n";

  setupI18n();
  $: { 
    if (typeof document != "undefined") {
      document.dir = $dir; 
    }
  }
</script>



<svelte:head>
  {#if $dir == "rtl"}
    <link rel="stylesheet" id="bootstrap" href="{rtlUrl}" />
  {:else}
    <link rel="stylesheet" id="bootstrap" href="{ltrUrl}" />
  {/if}
</svelte:head>

<div id="routify-app">
  <Router {router} />
</div>

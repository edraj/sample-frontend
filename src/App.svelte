<script context="module" lang="ts">
  import { Router, createRouter, context } from '@roxi/routify';
  import "bootstrap-icons/font/bootstrap-icons.min.css";
  const rtlUrl = new URL('bootstrap/dist/css/bootstrap.rtl.min.css', import.meta.url).href;
  const ltrUrl = new URL('bootstrap/dist/css/bootstrap.min.css', import.meta.url).href;
  import routes from '../.routify/routes.default.js';


  function findRoute(routesChildren, paths) {
      if (paths.length === 0) {
          return routesChildren;
      }

      const [currentPath, ...remainingPaths] = paths;
      const matchingChild = routesChildren.find(child => child.name === currentPath);

      if (matchingChild) {
          return findRoute(matchingChild.children, remainingPaths);
      } else {
          return null;
      }
  }
  async function prepareRouter(lang: string) {
      // console.log($activeRoute.fragments.pop().node);
      return createRouter({
          routes: routes,
          urlRewrite: {
              toInternal: (url) => {
                  const paths = url.split("/");
                  paths.shift();
                  const fileName = paths[paths.length-1]
                  if (![".en", ".ar", ".kd"].includes(fileName)) {
                      const _fileName = `${fileName}.${lang}`;
                      paths[paths.length-1] = _fileName;
                      if (findRoute(routes.children, paths) !== null){
                          return url.split('/').slice(0, url.split('/').length-1).join("/") + `/${fileName}.${lang}`;
                      }
                  }
                  return url;
              },
              toExternal: url => {
                  return url;
              }
          }
      });
  }
</script>

<script lang="ts">
  import { setupI18n, dir , locale/*, actual_locales*/ } from "./i18n";

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
  {#await prepareRouter($locale) then router}
      <Router {router} />
  {/await}
</div>

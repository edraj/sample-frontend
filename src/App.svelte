<script context="module" lang="ts">
  import { Router, createRouter } from '@roxi/routify';
  import "bootstrap-icons/font/bootstrap-icons.min.css";
  const rtlUrl = new URL('bootstrap/dist/css/bootstrap.rtl.min.css', import.meta.url).href;
  const ltrUrl = new URL('bootstrap/dist/css/bootstrap.min.css', import.meta.url).href;
  import routes_en from '../.routify/routes.default_en.js'
  import routes_ar from '../.routify/routes.default_ar.js'
  import routes_kd from '../.routify/routes.default_kd.js'

   async function prepareRouter(lang: string) {
    console.log("LANG", lang);
    if(lang == 'ar') {
      return createRouter({routes: routes_ar});
    } else if (lang == 'kd') {
      return createRouter({routes: routes_kd});
    } else {
      return createRouter({routes: routes_en});
    }
  }
</script>

<script lang="ts">
  import { setupI18n, dir , locale/*, actual_locales*/ } from "./i18n";
  

  // import {/*resolveNode,*/ context} from '@roxi/routify';

  // const availableNode = resolveNode($context.node.name + "." + $locale);
  // console.log("INSIDE", $context.node);

  setupI18n();
  $: {
    if (typeof document != "undefined") {
      document.dir = $dir; 
    }
  }

  
      // let found = routes.children.find(o => o.name.startsWith(url.replace("/","")) && !supported_languages.test(url));
      // if (typeof found == "undefined") return url;
      // return !(supported_languages.test(found.name))?url:(url+"_" + $locale);

  // files with language support end with _[language_code]
  // const supported_languages = new RegExp("_(" + actual_locales.join("|")+ ")$");
  // function calculate_url(url : string): string {
  //     let found = routes.children.find(o => o.name.startsWith(url.replace("/","")) && !supported_languages.test(url));
  //     if (typeof found == "undefined") return url;
  //     return !(supported_languages.test(found.name))?url:(url+"_" + $locale);
  // }
  // const urlRewrite: UrlRewrite = {
  //   toExternal: url => calculate_url(url), 
  //   toInternal: url => calculate_url(url)
  // }
</script>



<svelte:head>
  {#if $dir == "rtl"}
    <link rel="stylesheet" id="bootstrap" href="{rtlUrl}" />
  {:else}
    <link rel="stylesheet" id="bootstrap" href="{ltrUrl}" />
  {/if}
</svelte:head>


<div id="routify-app">
  {#await prepareRouter( ($locale == 'ar')?'_ar':'_kd') then router}
      <Router {router} />
  {/await}
</div>


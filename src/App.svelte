<script context="module" lang="ts">
  import { Router, createRouter } from '@roxi/routify';
  import "bootstrap-icons/font/bootstrap-icons.min.css";
  const rtlUrl = new URL('bootstrap/dist/css/bootstrap.rtl.min.css', import.meta.url).href;
  const ltrUrl = new URL('bootstrap/dist/css/bootstrap.min.css', import.meta.url).href;
  import routes_en from '../.routify/routes.default_en.js';
  import routes_ar from '../.routify/routes.default_ar.js';
  import routes_kd from '../.routify/routes.default_kd.js';
  import routes from '../.routify/routes.default.js';

  function removeDuplicates(objects) {
    const uniqueMap = new Map();

    objects.forEach(obj => {
      uniqueMap.set(obj.name, obj);
    });

    const uniqueObjects = Array.from(uniqueMap.values());
    return uniqueObjects;
  }

   async function prepareRouter(lang: string) {
    let base;
    if(lang == 'ar') {
      base = routes_ar;
      base.children = removeDuplicates([...routes.children, ...base.children])
    } else if (lang == 'kd') {
      base = routes_kd;
      base.children = removeDuplicates([...routes.children, ...base.children])
    } else {
      base = routes_en;
      base.children = removeDuplicates([...routes.children, ...base.children])
    }
    return createRouter({
      routes: base, 
      urlRewrite: {
            toInternal: url => {
                console.log({url})
                if(url.includes("_en")) return url.replace("_en", ".en");
                else if(url.includes("_kd")) return url.replace("_kd", ".kd");
                else if(url.includes("_ar")) return url.replace("_ar", ".ar");
                else return url;
            },
            toExternal: url => url
        }
      });
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
  {#await prepareRouter($locale) then router}
      <Router {router} />
  {/await}
</div>


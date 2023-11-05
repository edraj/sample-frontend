<script lang="ts">

  import { Col, Container, Row } from "sveltestrap";
  import Header from "@/components/Header.svelte";
  import Footer from "@/components/Footer.svelte";

  let window_height: number;
  let header_height: number;
  let footer_height: number;

</script>

<svelte:window bind:innerHeight={window_height} />

<div bind:clientHeight={header_height} class="fixed-top"><Header /></div>
  <Container
    fluid={true}
    class="position-relative pt-4 ps-4 m-2 w-100 overflow-auto"
    style="top: {header_height}px; height: {window_height - header_height - footer_height - 2}px;"
  >
        <slot />
  </Container>
<div bind:clientHeight={footer_height} class="fixed-bottom">
  <Footer />
</div>

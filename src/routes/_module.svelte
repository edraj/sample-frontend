<script lang="ts">

  import { Col, Container, Row } from "sveltestrap";
  import Header from "@/components/Header.svelte";
  import Footer from "@/components/Footer.svelte";
  import {isActive, resolveNode} from '@roxi/routify';

  let window_height: number;
  let header_height: number;
  let footer_height: number;

  const node = resolveNode(".");

  // let children = [];
  // node.children.forEach((item) => {
  //   console.log(item.name);
  // });

</script>

<svelte:window bind:innerHeight={window_height} />

<div bind:clientHeight={header_height} class="fixed-top"><Header /></div>
  <Container
    fluid={true}
    class="position-relative pt-4 ps-4 m-2 w-100 overflow-auto"
    style="top: {header_height}px; height: {window_height - header_height - footer_height - 2}px;"
  >
  <Row>
    <Col sm="2">
      <ul>
          {#each node.children as child (child.path)}
              <li>
                  <a href={child.path} class:active={$isActive(child.path)}>{child.name}</a>
              </li>
          {/each}
      </ul>
    </Col>
    <Col sm="10">
      <slot />
    </Col>
  </Row>
  </Container>
<div bind:clientHeight={footer_height} class="fixed-bottom">
  <Footer />
</div>

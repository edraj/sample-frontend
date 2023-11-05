<script lang="ts">
  import { Navbar, NavbarBrand } from "sveltestrap";
  import SelectLanguage from "./SelectLanguage.svelte";
  import Icon from "@/components/Icon.svelte";
</script>

<Navbar class=" px-3 mt-0 py-0" color="light" light>
  <SelectLanguage />
  <NavbarBrand href="" title="Test2"><Icon name="envelope-at" class="text-secondary"/></NavbarBrand>
  <NavbarBrand href="" title="Test3"><Icon name="chat-left-text" class="text-secondary"/></NavbarBrand>
</Navbar>

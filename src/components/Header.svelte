<script lang="ts">
  import { Navbar, NavbarBrand, Nav, NavLink } from "sveltestrap";
  import { _ } from "@/i18n";
</script>

<Navbar color="light" light expand="md" class="px-2 w-100 py-0">
  <NavbarBrand href="/" title="{$_('home')}">{$_('home')}</NavbarBrand>
  <Nav class="me-auto" navbar>
    <NavLink href="/about">{$_("about")}</NavLink>
    <NavLink href="/contact">{$_("contact_us")}</NavLink>
  </Nav>
</Navbar>

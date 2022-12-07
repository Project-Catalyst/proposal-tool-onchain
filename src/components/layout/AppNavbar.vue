<template>
  <nav
    class="navbar is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link
        :to="{ name: 'home' }"
        class="navbar-item"
      >
        <img
          src="@/assets/images/catalyst.png"
          alt="Project Catalyst"
        >
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="app-navbar"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="app-navbar"
      class="navbar-menu"
    >
      <div class="navbar-start">
        <span class="navbar-item">
          <button-wallet />
        </span>
      </div>

      <div class="navbar-end">
        <o-dropdown
          aria-role="list"
          position="bottom-left"
        >
          <template #trigger="{ active }">
            <navbar-dropdown
              :is-active="active"
              pages-name-prefix="funds:"
            >
              Funds
            </navbar-dropdown>
          </template>

          <navbar-dropdown-item :to="{name: 'funds:list'}">
            List
          </navbar-dropdown-item>

          <navbar-dropdown-item :to="{name: 'funds:current'}">
            Current
          </navbar-dropdown-item>
        </o-dropdown>

        <navbar-link :to="{name: 'challenges', params: {fundHash: 'current'}}">
          Challenges
        </navbar-link>

        <navbar-link :to="{name: 'proposals:my'}">
          My Proposals
        </navbar-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import ButtonWallet from "@/components/controls/ButtonWallet.vue";
import NavbarDropdown from "@/components/layout/NavbarDropdown.vue";
import NavbarDropdownItem from "@/components/layout/NavbarDropdownItem.vue";
import NavbarLink from "@/components/layout/NavbarLink.vue";
</script>

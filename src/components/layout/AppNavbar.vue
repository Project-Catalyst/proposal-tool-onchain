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
        <navbar-link :to="{name: 'funds:selected'}">
          Fund
        </navbar-link>

        <navbar-link :to="{name: 'challenges'}">
          Challenges
        </navbar-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import ButtonWallet from "@/components/controls/ButtonWallet.vue";
import NavbarLink from "@/components/layout/NavbarLink.vue";
</script>

<template>
  <nav
    class="navbar is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link
        :to="{ name: 'Home' }"
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
  </nav>
</template>


<style lang="scss">
@import '@/assets/style/theme.scss';

.navbar-brand {
  min-width: 130px;

  .navbar-item {
    background: transparent !important;
  }
}
</style>

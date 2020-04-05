<template>
    <div>
        <footer id="foo" class=" light-blue darken-3 page-footer">
          <div class="footer-copyright">
            <div class="container">
            © 2020 Copyright
            <a class="grey-text text-lighten-4 right" href="#!"></a>
            </div>
          </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
#foo {
    position: fixed;
    bottom: 0;
    width: 100%;
}

  /* main {
    flex: 1 0 auto;
  } */
</style>
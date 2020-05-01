<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="http://www.creative-tim.com">
            Creative Tim
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://blog.creative-tim.com">
            Blog
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://www.creative-tim.com/license">
            Licenses
          </a>
        </li>
      </ul>
      <div class="copyright">
        © {{year}} made with
        <a href="http://hes.korea.ac.kr" target="_blank" rel="noopener">Korea Univ. occupational Health and Environment</a> &
        <a href="https://cs.kyonggi.ac.kr" target="_blank" rel="noopener">Kyonggi Univ. Computer Science</a> Capstone Design Team SCV
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>

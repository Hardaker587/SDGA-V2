<template>
  <div class="flex flex-col md:flex-row space-x-4 md: h-screen items-center">
    <div class="flex md:flex-1 justify-center">
      <img
        src="/images/branding/main-logo.svg"
        id="main_logo"
        alt="social development goals"
      />
    </div>
    <div class="flex-1">
      <h1 class="text-2xl font-black">
        Sustainable Development Goals Assessment Tool (SDGs AT)
      </h1>
      <p>
        The 2030 Agenda for Sustainable Development Goals (SDGs), adopted by all
        United Nations Member States in 2015, provides a shared blueprint for
        peace, prosperity and partnerships for people and the planet, now and
        into the future. At its heart are the 17 SDGs, which are an urgent call
        for action by all countries - developed and developing - in a global
        partnership. It is recognised that ending poverty and other deprivations
        must go hand-in-hand with strategies that improve health and education,
        reduce inequality, and spur economic growth – all while tackling climate
        change and working to preserve our oceans and forests. The 2030 Agenda
        has expanded the role of universities, colleges, and higher education
        institutions from teaching, research, organisational governance, and
        community outreach to catalyse the implementation of the SDGs. SDG4:
        Quality Education, puts universities at the core of SDGs implementation.
        The SDGs Assessment Tool will assist in collecting data for
        benchmarking, decision-making and reporting on how far they are from
        achieving SDGs. A Manual on the SDGs AT will assist to navigate the
        assessment tool.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
}
</script>

<style scoped lang="scss">
#main_logo {
  -webkit-animation-name: rotate;
  -webkit-animation-duration: 15s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: rotate;
  -moz-animation-duration: 15s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  max-width: 500px;
  max-height: 500px;
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
</style>

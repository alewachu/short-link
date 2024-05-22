export default defineNuxtRouteMiddleware(async (to, from) => {
  const { fetchGithubUser } = useGithub();
  const user = await fetchGithubUser();

  if (!user?.value?.id) {
    return navigateTo('/login');
  }

  if (to.path !== '/') {
    return navigateTo(to.path);
  }
});

import { type Status, type User } from '~/types/commons';

export default function () {
  const runtimeConfig = useRuntimeConfig();
  const statusUser = useState<Status>('IDLE');
  const useGithubCookie = () => useCookie('gh_token');

  const githubFetch = (url: string) => {
    return $fetch(url, {
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `token ${useGithubCookie().value}`,
      },
    });
  };

  const fetchGithubUser = async (): Promise<Ref<User | null>> => {
    const cookie = useGithubCookie();
    const user = useState<User | null>('gh_user');
    statusUser.value = 'IDLE';
    if (cookie.value && !user.value) {
      statusUser.value = 'LOADING';
      try {
        user.value = (await githubFetch('/user')) as User;
        statusUser.value = 'SUCCESS';
      } catch (error) {
        user.value = null;
        statusUser.value = 'ERROR';
      }
    }
    return user;
  };

  const githubLogin = () => {
    statusUser.value = 'LOADING';
    if (process.client) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?client_id=${runtimeConfig.public.github.clientId}&scope=public_repo`
      );
    }
  };

  const githubLogout = async () => {
    useGithubCookie().value = null;
    useState('gh_user').value = null;
  };

  return { githubFetch, statusUser, fetchGithubUser, githubLogin, githubLogout };
}

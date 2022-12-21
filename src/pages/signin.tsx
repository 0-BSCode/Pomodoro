import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { Provider } from "next-auth/providers";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface Props {
  providers: Provider[];
}

function SignIn({ providers }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-sm border-2 border-cGray-300 p-3">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Continue with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default SignIn;

import { retrieveState, clearState } from "../utils/browser";
import { useQuery } from "react-query";
import { createFetcher, endpoints } from "../utils/fetchhelpers";
import config from "../config";
import { Redirect, useLocation } from "wouter";
import { useRef } from "react";
import AuthErrorView from "./AuthErrorView";
import Loader from "./Loader";

export function withProtectedAccess(
  WrappedComponent,
  isSignIn = false,
  isSignUp = false
) {
  return function A(props) {
    const [location, _] = useLocation();

    let authContext =
      retrieveState("session", config.browserStorageKeys.accessToken) ||
      retrieveState("local", config.browserStorageKeys.accessToken);

    const savedTokenRef = useRef(authContext || "");

    const { isLoading, isError, data, error, refetch } = useQuery({
      queryKey: [endpoints.sessionInfo, "POST", savedTokenRef.current],

      queryFn: createFetcher({
        url: endpoints.sessionInfo,
        method: "POST",
        body: {
          token: savedTokenRef.current?.accessToken,
        },

        formEncoded: true,
      }),

      enabled: !!savedTokenRef.current,

      keepPreviousData: true,

      refetchInterval: 30000,

      retry: 1,

      onError(err) {
        console.log("Unable to retreive auth details", err);
      },

      onSuccess(data) {},
    });

    const authenticated =
      data?.isAuthenticated && data?.session && !data.session?.revoked;

    function logOut() {
      clearState("session", config.browserStorageKeys.accessToken);
      clearState("local", config.browserStorageKeys.accessToken);
      savedTokenRef.current = null;
      refetch();
    }

    if (!savedTokenRef.current) {
      if (isSignIn || isSignUp) {
        return <WrappedComponent {...props} />;
      } else {
        const search = new URLSearchParams({}).toString();
        return <Redirect replace to={`/login?${search}`} />;
      }
    }

    if (isError) {
      return <AuthErrorView internal internalError={error.message} />;
    }

    if (isLoading && !authenticated) {
      return (
        <div className="center min-h-screen center">
          <Loader size={25} type="grid" speedMultiplier={1.5} />;
        </div>
      );
    }

    if (authenticated) {
      if (isSignIn) {
        return <Redirect replace to={config.namedUrls.authHome} />;
      } else {
        return (
          <WrappedComponent
            {...props}
            {...data}
            token={authContext}
            session={data.session}
            user={data.user}
            logOut={logOut}
          />
        );
      }
    } else {
      if (isSignIn || isSignUp) {
        return <WrappedComponent {...props} />;
      } else {
        const search = new URLSearchParams({}).toString();

        return <Redirect replace to={`/login?${search}`} />;
      }
    }
  };
}

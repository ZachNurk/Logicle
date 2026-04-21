import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";

export type AuthStatus = "loading" | "loggedOut" | "loggedIn";
export type AuthView = "login" | "createAccount";

export type AuthUser = {
  id: string;
  email: string;
  completedDayIds?: string[];
};

const AUTH_USER_STORAGE_KEY = "logicle_auth_user";


export function useAuth() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [authView, setAuthView] = useState<AuthView>("login");
  /** True until PuzzleScreen consumes it — set only after successful register. */
  const [openHowToPlayAfterSignup, setOpenHowToPlayAfterSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSendingForgotPassword, setIsSendingForgotPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [createAccountError, setCreateAccountError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Single place to apply a logged-in user. When we later need to fetch
  // progress/streak from the DB after login, add those calls here.
  const applyAuthenticatedUser = async (user: AuthUser) => {
    const res = await fetch(
      `/api/users/${encodeURIComponent(user.email)}/progress`,
    );
    const data = await res.json();
    setCurrentUser({
      ...user,
      completedDayIds: data.completedDayIds,
    });
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
    setAuthStatus("loggedIn");
  };


const validateEmail =(email: string): boolean => {
  return (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) !== null
  );
}

  // Check if user is already logged in locally 
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
      if (!storedUser) {
        setAuthStatus("loggedOut");
        return;
      }

      const parsed = JSON.parse(storedUser) as AuthUser;
      if (!parsed?.id || !parsed?.email) {
        localStorage.removeItem(AUTH_USER_STORAGE_KEY);
        setAuthStatus("loggedOut");
        return;
      }

      applyAuthenticatedUser(parsed);
    } catch {
      localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      setAuthStatus("loggedOut");
    }
  }, []);

  const handleForgotPassword = useCallback(async () => {
    setForgotPasswordMessage(null);
    setLoginError(null);
    if (!validateEmail(email)) {
      setForgotPasswordMessage(null);
      setLoginError("Enter a valid email to reset your password.");
      return;
    }
    setIsSendingForgotPassword(true);
    try {
      const res = await fetch("/api/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Could not send reset email");
      }
      setForgotPasswordMessage(
        typeof data?.data === "string" ? data.data : "Check your email for a reset code.",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not send reset email";
      setForgotPasswordMessage(null);
      setLoginError(message);
    } finally {
      setIsSendingForgotPassword(false);
    }
  }, [email]);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null);
    setForgotPasswordMessage(null);
    setIsSigningIn(true);

    if (!validateEmail(email)) {
      setLoginError("Invalid email.");
      setIsSigningIn(false);
      return;
    }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Sign in failed");
      }

      const user = data?.user as AuthUser | undefined;
      if (user) {
        applyAuthenticatedUser(user);
      }

      setAuthView("login");
      setLoginError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign in failed";
      setLoginError(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleCreateAccountSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateAccountError(null);
    setIsCreatingAccount(true);

    if (!validateEmail(email)) {
      setCreateAccountError("Invalid email.");
      setIsCreatingAccount(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Create account failed");
      }

      const user = data?.user as AuthUser | undefined;
      if (user) {
        await applyAuthenticatedUser(user);
        setOpenHowToPlayAfterSignup(true);
      }

      setAuthView("login");
      setCreateAccountError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Create account failed";
      setCreateAccountError(message);
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const showCreateAccount = () => {
    setLoginError(null);
    setForgotPasswordMessage(null);
    setCreateAccountError(null);
    setEmail("");
    setPassword("");
    setAuthView("createAccount");
  };

  const showLogin = () => {
    setLoginError(null);
    setForgotPasswordMessage(null);
    setCreateAccountError(null);
    setEmail("");
    setPassword("");
    setAuthView("login");
  };

  const refreshUserProgress = async () => {
    if (!currentUser?.email) return;
    const res = await fetch(`/api/users/${encodeURIComponent(currentUser.email)}/progress`);
    const data = await res.json();
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            completedDayIds: data.completedDayIds,
          }
        : null,
    );
  };

  const logout = useCallback(() => {
    setAuthStatus("loggedOut");
    setAuthView("login");
    setCurrentUser(null);
    setOpenHowToPlayAfterSignup(false);
    localStorage.clear();
  }, []);

  const clearHowToPlayAfterSignup = useCallback(() => {
    setOpenHowToPlayAfterSignup(false);
  }, []);

  return {
    authStatus,
    authView,
    email,
    password,
    isSigningIn,
    isSendingForgotPassword,
    forgotPasswordMessage,
    loginError,
    isCreatingAccount,
    createAccountError,
    currentUser,
    setEmail,
    setPassword,
    handleLoginSubmit,
    handleForgotPassword,
    handleCreateAccountSubmit,
    showCreateAccount,
    showLogin,
    logout,
    refreshUserProgress,
    openHowToPlayAfterSignup,
    clearHowToPlayAfterSignup,
  };
}

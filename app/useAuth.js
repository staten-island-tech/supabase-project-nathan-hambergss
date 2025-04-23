import { ref } from "vue";
import { supabase } from "./supabase";

const user = ref(null);
const loading = ref(false);
const error = ref(null);

export function useAuth() {
    const signUp = async (email, password) => {
        loading.value = true
        error.value = null
        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });
            if (signUpError) throw signUpError
            user.value = data.user
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        };
    };
    return {
        signUp,
        error,
        loading,
        user,
    };
};


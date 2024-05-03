<template>
  <div class="login-main section">
    <div class="header flex flex-col items-center text-center mb-12">
      <Logo class="w-24 h-24" />
      <p class="max-w-[200px] mx-auto">
        Sign up to start using
        <span class="font-semibold">Cloud of Worshippers</span>
      </p>
    </div>
    <form class="flex flex-col gap-3 max-w-[325px] mx-auto">
      <UFormGroup size="lg">
        <UInput placeholder="Your full name" v-model="fullName" />
      </UFormGroup>
      <UFormGroup size="lg">
        <UInput placeholder="Your email" v-model="email" />
      </UFormGroup>
      <UFormGroup size="lg">
        <div class="flex relative">
          <UInput
            placeholder="Choose a password"
            :type="passwordType"
            class="w-[100%]"
            v-model="password"
            @update:model-value="passwordInputHover = true"
            @blur="passwordInputHover = false"
          />
          <UButton
            class="absolute right-0 top-0 bottom-0"
            color="gray"
            variant="ghost"
            size="sm"
            @click="
              passwordType === 'password'
                ? (passwordType = 'text')
                : (passwordType = 'password')
            "
          >
            <IconWrapper
              size="5"
              :name="
                passwordType === 'password'
                  ? 'i-tabler-eye'
                  : 'i-tabler-eye-off'
              "
            />
          </UButton>
        </div>
        <div
          v-if="passwordInputHover"
          class="help text-gray-400 text-xs mt-2 flex gap-2 come-up-1"
        >
          <IconWrapper name="i-bx-info-circle" size="3" />
          Password must be at least 8 characters, including upper and lowercase
          characters, one number, and a special character
        </div>
      </UFormGroup>

      <UButton
        block
        size="lg"
        class="mt-12"
        :disabled="!(useValidEmail(email) && passwordValid)"
        :loading="loading"
        @click="signup"
      >
        Create your account
      </UButton>
      <p class="text-sm flex items-center justify-center gap-0">
        I already have an account.
        <UButton size="sm" class="p-1" variant="link" to="/login"
          >Sign in</UButton
        >
      </p>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
})

const fullName = ref("")
const email = ref("")
const password = ref("")
const passwordType = ref("password")
const passwordInputHover = ref(false)

const passwordValid = computed(() => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
  return regex.test(password.value)
})

onMounted(() => {
  setTimeout(() => {
    useToast().add({
      title: "Still not convinced?",
      color: "red",
      description:
        "Watch this video to see why we think Cloud of Worshippers is your church's literal power point.",
      timeout: 0,
      actions: [
        {
          icon: "i-bx-play",
          label: "Watch video",
          click: () =>
            window.open(
              "https://www.youtube.com/watch?v=e3tbMg_CrpE",
              "_blank"
            ),
        },
      ],
    })
  }, 1000)
})
</script>

<style scoped></style>

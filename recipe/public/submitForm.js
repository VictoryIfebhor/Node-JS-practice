const form = document.querySelector("form")
const submitBtn = document.querySelector("form > button")
const emailError = document.querySelector(".email.error")
const passwordError = document.querySelector(".password.error")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    // reset error messages if it exists
    emailError.textContent = ""
    passwordError.textContent = ""

    const email = form.email.value
    const password = form.password.value
    const btnValue = submitBtn.value.toLowerCase()

    if (!["login", "sign up"].includes(btnValue)){
        console.log(`No action was designated ${btnValue} button`)
    } else {
        let url = btnValue === "sign up" ? "signup" : "login"
        url = `/users/${url}`
        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ email, password}),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            emailError.textContent = data.errors?.email || ""
            passwordError.textContent = data.errors?.password || ""
            if (data.user) {
                location.assign("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
})
function ResendButton({rno}){
    async function resendOtp(){
        try{
            const resend = await fetch("https://aadukalam-api-cgd7f8fhfug8a7dk.southeastasia-01.azurewebsites.net/login-signup/otp-resend",{
                method:"POST",
                body: JSON.stringify({rno:rno}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await resend.json()
            if(data.msg){
                alert("otp resent successfully")
            }
            else{
                throw new Error(data)
            }
        }
        catch(error){
            alert(JSON.stringify(error.message))
        }
    }
 return(
    <div>
        <button onClick={resendOtp}>Resend OTP</button>
    </div>
 )
}
export default ResendButton
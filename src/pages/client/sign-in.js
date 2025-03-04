import $ from 'jquery';
import { signin } from "../../../api/user";
import Header from "../../components/header";
// eslint-disable-next-line import/order
import validate  from 'jquery-validation';
// eslint-disable-next-line no-unused-vars
const SignInPage = {
    render(){
        return /* html */`
        <div class="container w-full mx-auto max-h-full">  
        ${Header.render()} 
            <div class="min-h-full flex items-center justify-center py-40 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                <div>
                    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                    Or
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        start your 14-day free trial
                    </a>
                    </p>
                </div>
                <form class="mt-8 space-y-6" method="POST" id="formSignin">
                    <input type="hidden" name="remember" value="true">
                    <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
                    </div>
                    </div>
            
                    <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        
                    </div>
            
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                        </a>
                    </div>
                    </div>
            
                    <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                        Sign in
                    </button>
                    </div>
                </form>
                </div>
            </div>
            <footer class="bg-slate-300 h-12 flex items-center justify-center mt-4">
                <h3 class="text-stone-700">Design by <span class="text-red-500 font-xs">Bùi Tiến Đình</span></h3>
            </footer>
        </div>
        `
    },
    afterRender(){
        const formSignin = $("#formSignin");

        formSignin.validate({
            rules : {
                "email" : {
                    required : true,
                },
                "password" : {
                    required : true,
                },
               
            },
            messages : {
                "email" : {
                    required : "Bạn chưa email",
                },  
                "password" : {
                    required : "Mời nhập password",
                },
                
            },
            submitHandler() {
                async function Login(){
                    try {
                        const res =  await signin({
                            "email" : document.querySelector("#email").value,
                            "password" : document.querySelector("#password").value
                        });
        
                        localStorage.setItem('user',JSON.stringify(res.data.user));
                        if(res.data.user.id === 1){
                            document.location.href = "/admin/news";
                        }else{
                            document.location.href = "/";
                        }
        
                    } 
                    catch (error) {
                        document.location.href = "/";
                    }
                }
                Login();
            }
        
        // formSignin.addEventListener( 'submit' , async (e)=>{
        //     e.preventDefault();
                
                
        // });
    })
    }
}
export default SignInPage;
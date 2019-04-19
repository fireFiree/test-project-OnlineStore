export default function authorize({isAdmin, email}) {
	localStorage.setItem("currUser", JSON.stringify({isAdmin, email}));
	this.show("/top/phones");
}

module.exports = {

"[project]/.next-internal/server/app/api/user-register/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongodb [external] (mongodb, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}}),
"[project]/lib/db/connectDB.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
const { MongoClient, ServerApiVersion } = __turbopack_context__.r("[externals]/mongodb [external] (mongodb, cjs)");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m65dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
let clientPromise = client.connect();
const __TURBOPACK__default__export__ = clientPromise;
}}),
"[project]/lib/db/getCollectionDB.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getCollectionDB": (()=>getCollectionDB)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/connectDB.js [app-route] (ecmascript)");
;
async function getCollectionDB(collectionName) {
    const client = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
    const db = client.db("madchef-next-js");
    return db.collection(collectionName);
} // const Home = () => {
 //   const { isDarkMode } = useContext(DarkModeContext);
 //   async function fetchFoodData() {
 //     const { data } = await axios.get(
 //       `https://madchef-server-side.vercel.app/allfood`
 //     );
 //     return data;
 //   }
 //   const {
 //     data: homeData = [],
 //     isLoading,
 //     isError,
 //   } = useQuery({
 //     queryKey: ["homefood"],
 //     queryFn: fetchFoodData,
 //   });
 //   const filterData = homeData
 //     .sort(function (a, b) {
 //       return b.purchase_count - a.purchase_count;
 //     })
 //     .slice(0, 8);
 //   if (isLoading) {
 //     return (
 //       <div className="flex items-center justify-center min-h-screen">
 //         <span className="loading loading-spinner loading-lg"></span>
 //       </div>
 //     );
 //   }
 //   return (
 //     <div>
 //       <div className="w-[90%] lg:w-[80%] mx-auto pb-20 lg:pt-2 pt-10 sm:pt-12">
 //         <div className="mb-12 text-center">
 //           <h1 className="text-center font-semibold lg:text-3xl text-2xl">
 //             Top 6 best-selling food items{" "}
 //             <span className="text-xs font-normal">(by purchase count)</span>
 //           </h1>
 //           <p className="lg:text-sm text-xs mt-2">
 //             Discover the Top 6 Best-Selling Food Items That Have Captivated{" "}
 //             <br />
 //             Taste Buds Everywhere and Become Absolute Favorites
 //           </p>
 //         </div>
 //         <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 w-[90%] lg:w-[100%] mx-auto">
 //           {filterData.map((e) => (
 //             <div
 //               key={e._id}
 //               className={`card card-compact bg-base-100 hover:scale-[1.02] duration-300 shadow-xl ${
 //                 isDarkMode && "text-black"
 //               }`}
 //             >
 //               <figure className="h-[10rem] drop-shadow-xl relative">
 //                 <p className="text-[9px] left-3 bottom-3 drop-shadow-xl font-medium absolute bg-white px-3 py-1 rounded-lg">
 //                   Purchase Count: {e.purchase_count}
 //                 </p>
 //                 <img
 //                   className="object-cover rounded-2xl w-full h-[10rem]"
 //                   src={e.photo}
 //                   alt="Shoes"
 //                 />
 //               </figure>
 //               <div key={e._id} className="p-4 justify-between">
 //                 <h2 className="card-title">{e.foodname}</h2>
 //                 <p className="text-sm">Price: ${e.price}</p>
 //                 <p className="line-clamp-2 text-sm mt-1">{e.description}</p>
 //                 <div className="card-actions justify-end ">
 //                   <Link
 //                     className="w-full"
 //                     to={`/allfood/foodDetailes/${e._id}`}
 //                   >
 //                     <button
 //                       className="hover:bg-[#FF2727] bg-[#191A23] text-white
 //                     rounded-lg w-full py-2 mt-3 font-normal cursor-pointer text-sm active:scale-95 transition-all"
 //                     >
 //                       See More
 //                     </button>
 //                   </Link>
 //                 </div>
 //               </div>
 //             </div>
 //           ))}
 //         </div>
 //         <div className="flex items-center justify-center mt-14">
 //           <Link to={`/allfood`}>
 //             <button className="px-5 py-2 text-white rounded-lg bg-[#FF2727] hover:bg-[#FF2727]/80">
 //               See All
 //             </button>
 //           </Link>
 //         </div>
 //         <div className="w-[85%] mx-auto mt-16">
 //           <div className="flex flex-col items-center justify-center mb-10">
 //             <h1 className="lg:text-3xl text-2xl font-semibold">
 //               Savor the Excellence
 //             </h1>
 //             <p className="lg:text-sm text-xs text-center mt-2">
 //               Your ultimate destination for exceptional dining and unforgettable
 //               experiences.
 //             </p>
 //           </div>
 //           <About></About>
 //         </div>
 //         <div className="w-[100%] lg:w-[80%] mx-auto">
 //           <div className="flex items-center justify-center mt-20 mb-10 flex-col">
 //             <h1 className="lg:text-3xl text-2xl font-semibold text-center">
 //               What Our Customers Say
 //             </h1>
 //             <p className="text-center lg:text-sm text-xs mt-2">
 //               Read the Experiences of Our Satisfied Customers and Find Out Why
 //               They <br /> Trust Us for All Their Sports Equipment Needs
 //             </p>
 //           </div>
 //           <Customer></Customer>
 //         </div>
 //       </div>
 //     </div>
 //   );
 // };
 // export default Home;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/app/api/user-register/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$getCollectionDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/getCollectionDB.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function POST(req) {
    const body = await req.json();
    const userCollection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$getCollectionDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollectionDB"])("user");
    const result = await userCollection.insertOne(body);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__119e7e40._.js.map
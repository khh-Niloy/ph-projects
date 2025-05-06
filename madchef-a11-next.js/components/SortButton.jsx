// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function SortButton() {
//   const [currentSort, setcurrentSort] = useState("");

//   useEffect(()=>{

//   }, [currentSort])

//   return (
//     <div>
//       <Select onValueChange={(value) => setcurrentSort(value)}>
//         <SelectTrigger className="w-[180px] border border-black/10">
//           <SelectValue placeholder="Sort by price" />
//         </SelectTrigger>
//         <SelectContent className={`bg-white border border-black/10`}>
//           <SelectGroup>
//             <SelectItem value="dsc">High to low</SelectItem>
//             <SelectItem value="asc">Low to high</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <p>{currentSort}</p>
//     </div>
//   );
// }

const navLinks = {
  guest: [
    { label: "Home", link: "/" },
    { label: "All Foods", link: "/foods" },
    { label: "Gallery", link: "/gallery" },
  ],
  user: [
    { label: "Home", link: "/" },
    { label: "All Foods", link: "/foods" },
    { label: "Gallery", link: "/gallery" },
    { label: "My Orders", link: "/my-orders" },
  ],
  seller: [
    { label: "Home", link: "/" },
    { label: "All Foods", link: "/foods" },
    { label: "Add Food", link: "/foods/add" },
    { label: "My Food", link: "/foods/my-foods" },
  ],
};

export default function navbarMenu(userRole) {
  return navLinks[userRole] || navLinks["guest"];
}

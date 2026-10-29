import { Link } from "react-router";

import logo from "@/assets/images/brand/logo.png";
import { SITE } from "@/shared/constants/site";

export const Logo = ({ className }: { className?: string }) => (
  <Link to="/" aria-label={`${SITE.name} home`} className={className}>
    <img src={logo} alt={SITE.name} width={160} height={80} className="h-auto w-32 mix-blend-multiply sm:w-40" />
  </Link>
);

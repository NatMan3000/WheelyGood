import type { Brand, SetupId } from "../../types"
import { setupById } from "../../data/setups"
import { asset } from "../../utils/asset"

const SRC: Record<Brand, string> = {
  fanatec: asset("brand-fanatec.png"),
  logitech: asset("brand-logitech.png"),
}

const LABEL: Record<Brand, string> = {
  fanatec: "Fanatec",
  logitech: "Logitech G",
}

/*
  Wheel-base brand mark (Fanatec / Logitech) on a uniform white chip — same chip
  treatment as GameLogo/SetupLogo so the three logo families read as one set.
  Resolves the brand from the active setup.
*/
export default function BrandLogo({
  setupId,
  className = "h-6 w-6",
}: {
  setupId: SetupId
  className?: string
}) {
  const brand = setupById(setupId).brand
  return (
    <span className={`inline-grid shrink-0 place-items-center overflow-hidden rounded bg-white ${className}`}>
      <img
        src={SRC[brand]}
        alt={LABEL[brand]}
        title={LABEL[brand]}
        draggable={false}
        className="h-full w-full object-contain p-1"
      />
    </span>
  )
}

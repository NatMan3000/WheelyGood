import type { SetupId } from "../../types"
import { setupById } from "../../data/setups"
import { asset } from "../../utils/asset"

const SRC: Record<SetupId, string> = {
  xsx: asset("setup-xsx.png"),
  xss: asset("setup-xss.png"),
  pc: asset("setup-pc.svg"),
}

// XSX logo is white-on-black; invert it to dark-on-white so it matches the
// other logos on the uniform white chip.
const INVERT: Record<SetupId, boolean> = { xsx: true, xss: false, pc: false }

/** A setup's platform logo on a uniform white chip. Pass size via className. */
export default function SetupLogo({ setupId, className = "h-6 w-6" }: { setupId: SetupId; className?: string }) {
  const name = setupById(setupId).shortName
  return (
    <span className={`inline-grid shrink-0 place-items-center overflow-hidden rounded bg-white ${className}`}>
      <img
        src={SRC[setupId]}
        alt={name}
        title={name}
        draggable={false}
        className={`h-full w-full object-contain p-0.5 ${INVERT[setupId] ? "invert" : ""}`}
      />
    </span>
  )
}

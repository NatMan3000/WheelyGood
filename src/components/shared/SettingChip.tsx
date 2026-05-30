import { Link } from "react-router-dom"

export default function SettingChip({ id, label }: { id: string; label: string }) {
  return (
    <Link
      to={`/setting/${id}`}
      className="inline-flex items-center rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200 hover:border-accent transition-colors duration-150"
    >
      {label}
    </Link>
  )
}

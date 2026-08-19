import { PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";

export function BookingUnavailableNotice({
  preferredTimeText,
  onChangePreferredTime,
}: {
  preferredTimeText: string;
  onChangePreferredTime: (value: string) => void;
}) {
  const t = useTranslations("book.dateTime");

  return (
    <div className="rounded-2xl border border-wine/20 bg-wine/5 p-6">
      <div className="flex items-start gap-3">
        <PhoneCall className="mt-0.5 shrink-0 text-wine" size={20} />
        <div>
          <p className="font-medium text-wine">{t("unavailableTitle")}</p>
          <p className="mt-1 text-sm text-ink/65">
            {t("unavailableBody")}{" "}
            <a href="tel:+41782495584" className="text-wine hover:underline">
              078 249 55 84
            </a>
            .
          </p>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-ink/80">
          {t("preferredLabel")}
        </label>
        <input
          value={preferredTimeText}
          onChange={(e) => onChangePreferredTime(e.target.value)}
          placeholder={t("preferredPlaceholder")}
          className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
        />
      </div>
    </div>
  );
}

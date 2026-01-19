import { useState } from "react";
import { Moon, Globe, Bell, Shield, Trash2, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const settingsGroups = [
    {
      title: t("settings.appearance"),
      icon: Moon,
      items: [
        {
          label: t("settings.darkMode"),
          description: t("settings.darkMode.desc"),
          type: "switch",
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          label: t("settings.language"),
          description: t("settings.language.desc"),
          type: "select",
          value: language,
          onChange: (val: string) => setLanguage(val as "en" | "ar"),
          options: [
            { value: "en", label: "English" },
            { value: "ar", label: "العربية" },
          ],
        },
      ],
    },
    {
      title: t("settings.notifications"),
      icon: Bell,
      items: [
        {
          label: t("settings.pushNotifications"),
          description: t("settings.pushNotifications.desc"),
          type: "switch",
          value: pushNotifications,
          onChange: setPushNotifications,
        },
        {
          label: t("settings.emailNotifications"),
          description: t("settings.emailNotifications.desc"),
          type: "switch",
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
        {
          label: t("settings.smsNotifications"),
          description: t("settings.smsNotifications.desc"),
          type: "switch",
          value: smsNotifications,
          onChange: setSmsNotifications,
        },
      ],
    },
    {
      title: t("settings.privacy"),
      icon: Shield,
      items: [
        {
          label: t("settings.profileVisibility"),
          description: t("settings.profileVisibility.desc"),
          type: "switch",
          value: profileVisibility,
          onChange: setProfileVisibility,
        },
        {
          label: t("settings.twoFactor"),
          description: t("settings.twoFactor.desc"),
          type: "switch",
          value: twoFactor,
          onChange: setTwoFactor,
        },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">{t("settings.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("settings.subtitle")}</p>
          </div>

          {/* Settings Groups */}
          <div className="space-y-8">
            {settingsGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  <group.icon className="w-4 h-4" />
                  {group.title}
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>

                      {item.type === "switch" && (
                        <Switch
                          checked={item.value as boolean}
                          onCheckedChange={item.onChange as (val: boolean) => void}
                        />
                      )}

                      {item.type === "select" && (
                        <Select
                          value={item.value as string}
                          onValueChange={item.onChange as (val: string) => void}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Danger Zone */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-destructive uppercase tracking-wider">
                <Trash2 className="w-4 h-4" />
                {t("settings.account")}
              </div>

              <div className="bg-card border border-destructive/30 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-destructive">
                      {t("settings.deleteAccount")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("settings.deleteAccount.desc")}
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    {t("settings.delete")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;

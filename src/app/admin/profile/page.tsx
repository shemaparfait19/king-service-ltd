"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

type SiteSettings = {
  companyName: string;
  phonePrimary: string;
  phoneSecondary?: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram?: string;
  linkedin?: string;
};

export default function AdminProfilePage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState<SiteSettings>({
    companyName: "KING SERVICE TECH LTD",
    phonePrimary: "+250787649480",
    phoneSecondary: "+250798701852",
    email: "kstrwanda@gmail.com",
    whatsapp: "+250787649480",
    address: "V34R+P56, RN15, Nyamata, Bugesera",
    instagram: "https://www.instagram.com/kingservicetech/",
    linkedin: "https://rw.linkedin.com/in/celestin-habimana-66427b286",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const ref = doc(db, "settings", "site");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setSettings({ ...(snap.data() as SiteSettings) });
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveSettings = () => {
    startTransition(async () => {
      try {
        const ref = doc(db, "settings", "site");
        await setDoc(ref, settings, { merge: true });
        toast({ title: "Saved", description: "Site settings updated" });
      } catch {
        toast({ variant: "destructive", title: "Failed to save settings" });
      }
    });
  };

  const onChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({ variant: "destructive", title: "Passwords do not match" });
      return;
    }
    startTransition(async () => {
      try {
        const user = auth.currentUser;
        if (!user || !user.email) {
          toast({ variant: "destructive", title: "No authenticated user" });
          return;
        }
        const cred = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, cred);
        await updatePassword(user, newPassword);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast({ title: "Password updated" });
      } catch {
        toast({ variant: "destructive", title: "Failed to update password" });
      }
    });
  };

  if (loading) return <div className="container py-8">Loading…</div>;

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Profile</h1>
        <p className="text-muted-foreground">
          Update site settings and password
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Company Name</Label>
            <Input
              value={settings.companyName}
              onChange={(e) =>
                setSettings({ ...settings, companyName: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Primary Phone</Label>
            <Input
              value={settings.phonePrimary}
              onChange={(e) =>
                setSettings({ ...settings, phonePrimary: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Secondary Phone</Label>
            <Input
              value={settings.phoneSecondary || ""}
              onChange={(e) =>
                setSettings({ ...settings, phoneSecondary: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>WhatsApp</Label>
            <Input
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label>Address</Label>
            <Input
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Instagram URL</Label>
            <Input
              value={settings.instagram || ""}
              onChange={(e) =>
                setSettings({ ...settings, instagram: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>LinkedIn URL</Label>
            <Input
              value={settings.linkedin || ""}
              onChange={(e) =>
                setSettings({ ...settings, linkedin: e.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <Button type="button" onClick={saveSettings} disabled={isPending}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="md:col-span-3">
            <Button
              type="button"
              onClick={onChangePassword}
              disabled={isPending}
            >
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

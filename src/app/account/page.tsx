"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Lock, Image as ImageIcon, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function AccountPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "Maria Pastin",
    email: user?.email || "maria@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatar: "https://github.com/Ianthe23.png",
  });

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving account settings:", formData);
  };

  return (
    <div className="flex flex-col gap-6 w-full relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {/* Large orb top left */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.35)_0%,rgba(6,182,212,0.25)_40%,transparent_75%)] animate-[fadeInDark_1.5s_ease-out_forwards,dropMorph_25s_ease-in-out_infinite_2s]" />

        {/* Medium orb top right */}
        <div className="absolute top-20 -right-32 h-[400px] w-[400px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.35)_0%,rgba(59,130,246,0.25)_40%,transparent_75%)] animate-[fadeInBright_1.5s_ease-out_0.3s_forwards,dropMorph_20s_ease-in-out_infinite_2.3s]" />

        {/* Large orb bottom center */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,rgba(6,182,212,0.2)_40%,transparent_75%)] animate-[fadeInDark_1.5s_ease-out_0.6s_forwards,dropMorph_30s_ease-in-out_infinite_3s]" />
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-2 relative z-20">
        <Link
          href="/"
          className="w-fit mb-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors flex items-center gap-2 px-3 py-2 rounded-md relative z-20"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Account Settings</h1>
        <p className="text-sm text-zinc-400">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 relative z-10">
        {/* Profile Picture Section */}
        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-zinc-100 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-sky-500" />
              Profile Picture
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Update your profile picture
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-zinc-700 object-cover"
              />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="avatar" className="text-zinc-300">Avatar URL</Label>
              <Input
                id="avatar"
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:border-sky-500 focus:ring-sky-500/20"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Information Section */}
        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-zinc-100 flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-500" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:border-cyan-500 focus:ring-cyan-500/20"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:border-cyan-500 focus:ring-cyan-500/20"
                placeholder="your.email@example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-zinc-100 flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-500" />
              Change Password
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-zinc-300">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-zinc-300">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-zinc-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:border-purple-500 focus:ring-purple-500/20"
                placeholder="Confirm new password"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end relative z-10">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-medium px-6 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

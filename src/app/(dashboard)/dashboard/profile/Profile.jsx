"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "@/lib/api/auth";
import { getFromCookie } from "@/utils/cookies";
import { toast } from "sonner";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Input,
  Badge,
  Textarea,
  Select,
  Checkbox,
  AddressAutocomplete,
  Spinner
} from "@/components/ui";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  TrendingUp,
  Clock,
  Settings,
  Bell,
  Lock,
  Save,
  Edit2,
  CheckCircle2,
  Package
} from "lucide-react";

// Mock Data
const MOCK_USER_PROFILE = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Avid reader and book collector. Love sharing my favorite books with fellow readers!",
  memberSince: "January 2024",
  avatar: "SJ"
};

const MOCK_MY_BOOKS = [
  { id: 1, title: "The Great Gatsby", status: "Available", requests: 3 },
  { id: 2, title: "To Kill a Mockingbird", status: "Exchanged", requests: 0 },
  { id: 3, title: "1984", status: "Pending", requests: 1 },
];

const MOCK_EXCHANGE_HISTORY = [
  { id: 1, book: "Pride and Prejudice", partner: "John Doe", date: "2025-12-15", status: "Completed", points: 150 },
  { id: 2, book: "The Hobbit", partner: "Jane Smith", date: "2025-12-01", status: "Completed", points: 200 },
  { id: 3, book: "Animal Farm", partner: "Mike Brown", date: "2025-11-20", status: "Completed", points: 120 },
  { id: 4, book: "Brave New World", partner: "Emily White", date: "2025-11-10", status: "Cancelled", points: 0 },
];

const MOCK_POINTS_HISTORY = [
  { id: 1, type: "Earned", description: "Book exchange completed", date: "2025-12-15", amount: 150 },
  { id: 2, type: "Spent", description: "Requested 'Moby Dick'", date: "2025-12-10", amount: -180 },
  { id: 3, type: "Purchased", description: "Points package - Medium", date: "2025-12-05", amount: 500 },
  { id: 4, type: "Earned", description: "Book exchange completed", date: "2025-12-01", amount: 200 },
];

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    locationAddress: "",
    locationLat: null,
    locationLng: null,
    bio: "",
    memberSince: "",
    avatar: ""
  });

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  // Format member since date
  const formatMemberSince = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please select a valid image (jpg, png, gif, or webp)',
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', {
          description: 'Please select an image smaller than 5MB',
        });
        return;
      }

      setProfileImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleChangeAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Update formData when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        locationAddress: user.locationAddress || "",
        locationLat: user.locationLat || null,
        locationLng: user.locationLng || null,
        bio: user.bio || "Avid reader and book collector. Love sharing my favorite books with fellow readers!",
        memberSince: formatMemberSince(user.createdAt),
        avatar: getUserInitials()
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const accessToken = getFromCookie('accessToken');
      if (!accessToken) {
        toast.error('Authentication required', {
          description: 'Please sign in again',
        });
        return;
      }

      // Send all current form data to prevent data loss
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        locationAddress: formData.locationAddress || '',
        locationLat: formData.locationLat || '',
        locationLng: formData.locationLng || '',
        bio: formData.bio || '',
      };

      // Add profile image if selected
      if (profileImageFile) {
        updateData.profileImage = profileImageFile;
      }

      const response = await updateProfile(updateData, accessToken);
      
      // Refresh user data in context
      await refreshUser();
      
      // Clear image file state
      setProfileImageFile(null);
      setProfileImagePreview(null);
      
      toast.success('Profile updated successfully!', {
        description: 'Your changes have been saved',
      });
      
      setIsEditing(false);
    } catch (error) {
      toast.error('Update failed', {
        description: error.message || 'Failed to update profile',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            Profile & Account
          </Text>
          <Text variant="body" className="text-zinc-600">
            Manage your profile, books, and account settings
          </Text>
        </div>

        {/* Profile Info Tab */}
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={() => setIsEditing(false)} variant="outline" size="sm" disabled={isSaving}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave} variant="primary" size="sm" disabled={isSaving}>
                          {isSaving ? (
                            <>
                              <Spinner size="sm" className="mr-2" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      {profileImagePreview || user?.profileImage ? (
                        <img
                          src={profileImagePreview || user.profileImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-3xl font-bold">
                          {formData.avatar}
                        </div>
                      )}
                      {isEditing && (
                        <>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <Button variant="outline" size="sm" onClick={handleChangeAvatarClick} type="button">
                            Change Avatar
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </Text>
                        {isEditing ? (
                          <Input
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your name"
                          />
                        ) : (
                          <Text variant="body">{formData.name}</Text>
                        )}
                      </div>

                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </Text>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        ) : (
                          <Text variant="body">{formData.email}</Text>
                        )}
                      </div>

                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Text>
                        {isEditing ? (
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                          />
                        ) : (
                          <Text variant="body">{formData.phone}</Text>
                        )}
                      </div>

                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </Text>
                        {isEditing ? (
                          <AddressAutocomplete
                            value={formData.locationAddress}
                            onChange={(address, lat, lng) => {
                              setFormData({ 
                                ...formData, 
                                locationAddress: address,
                                locationLat: lat,
                                locationLng: lng
                              });
                            }}
                            placeholder="Enter your address"
                          />
                        ) : (
                          <Text variant="body">{formData.locationAddress || "No location set"}</Text>
                        )}
                      </div>
                    </div>

                    <div>
                      <Text variant="caption" className="mb-2">
                        Bio
                      </Text>
                      {isEditing ? (
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => handleChange("bio", e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Text variant="body">{formData.bio}</Text>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Account Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Text variant="caption" className="text-zinc-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Member Since
                      </Text>
                      <Text variant="h4">{formData.memberSince || "Unknown"}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Books Listed</Text>
                      <Text variant="h4">{user?.booksListed || 0}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Total Exchanges</Text>
                      <Text variant="h4">{user?.totalExchanges || 0}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Current Points</Text>
                      <Text variant="h4" className="text-amber-600">{user?.points || 0}</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
    </div>
  );
}

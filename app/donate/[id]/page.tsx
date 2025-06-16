"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Shield,
  TrendingUp,
  Heart,
  MapPin,
  Share2,
  Flag,
  Wallet,
  CreditCard,
  Smartphone,
  ArrowLeft,
  CheckCircle,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { useParams } from "next/navigation"

// Mock data for campaigns (same as explore page)
const campaigns = [
  {
    id: 1,
    title: "Bantuan Pendidikan Anak Yatim",
    description:
      "Membantu biaya pendidikan untuk 50 anak yatim di Jakarta Timur. Program ini bertujuan untuk memberikan akses pendidikan yang layak bagi anak-anak yatim yang kurang mampu. Dana yang terkumpul akan digunakan untuk biaya sekolah, seragam, buku, dan kebutuhan pendidikan lainnya.",
    fullDescription:
      "Yayasan Peduli Anak telah berkomitmen untuk membantu pendidikan anak-anak yatim di Jakarta Timur selama lebih dari 10 tahun. Saat ini, kami membutuhkan bantuan untuk mendukung 50 anak yatim yang sedang menempuh pendidikan dari tingkat SD hingga SMA.\n\nDana yang terkumpul akan dialokasikan untuk:\n- Biaya SPP dan uang sekolah (40%)\n- Seragam dan perlengkapan sekolah (25%)\n- Buku dan alat tulis (20%)\n- Biaya transportasi (10%)\n- Biaya operasional program (5%)\n\nSetiap anak yang mendapat bantuan akan dipantau perkembangan pendidikannya dan akan mendapat laporan berkala kepada para donatur.",
    category: "Pendidikan",
    location: "Jakarta",
    raised: 45000000,
    target: 100000000,
    donors: 234,
    daysLeft: 15,
    image: "/placeholder.svg?height=400&width=600",
    fundraiser: "Yayasan Peduli Anak",
    reputation: 4.8,
    verified: true,
    createdAt: "2024-01-15",
    updates: [
      {
        date: "2024-01-20",
        title: "Update Progress Minggu Pertama",
        content: "Terima kasih untuk semua donatur yang telah berpartisipasi. Kami telah mencapai 45% dari target!",
      },
      {
        date: "2024-01-18",
        title: "Dokumentasi Kunjungan Lapangan",
        content: "Tim kami telah mengunjungi sekolah-sekolah dan bertemu dengan anak-anak yang akan dibantu.",
      },
    ],
    milestones: [
      { percentage: 25, description: "Pembelian seragam dan perlengkapan sekolah", completed: true },
      { percentage: 50, description: "Pembayaran biaya SPP semester pertama", completed: false },
      { percentage: 75, description: "Pembelian buku dan alat tulis", completed: false },
      { percentage: 100, description: "Biaya transportasi dan operasional", completed: false },
    ],
  },
  // Add other campaigns here...
]

const donationAmounts = [50, 100, 250, 500, 1000, 2500]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "DON",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function DonatePage() {
  const params = useParams()
  const campaignId = Number.parseInt(params.id as string)
  const campaign = campaigns.find((c) => c.id === campaignId)

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorMessage, setDonorMessage] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  if (!campaign) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Kampanye tidak ditemukan</h1>
            <Link href="/explore-donation">
              <Button>Kembali ke Jelajahi Donasi</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const progressPercentage = Math.round((campaign.raised / campaign.target) * 100)
  const finalAmount = selectedAmount || Number.parseInt(customAmount) || 0

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            FundChain
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <Link href="/explore-donation" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Jelajahi Donasi
          </Link>
          <Link href="/start-fundraising" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Mulai Fundraising
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="w-full py-4 bg-white border-b">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/explore-donation" className="hover:text-blue-600 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Jelajahi Donasi
              </Link>
            </div>
          </div>
        </section>

        <div className="container px-4 md:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Header */}
              <Card>
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-700">{campaign.category}</Badge>
                  {campaign.verified && (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Terverifikasi
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{campaign.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {/* <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {campaign.location}
                        </div> */}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Dibuat {new Date(campaign.createdAt).toLocaleDateString("id-ID")}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Bagikan
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Progress Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Kampanye</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Terkumpul</span>
                      <span className="font-bold text-lg">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="font-semibold text-lg text-blue-600">{formatCurrency(campaign.raised)}</span>
                      <span>dari {formatCurrency(campaign.target)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{campaign.donors}</div>
                      <div className="text-sm text-muted-foreground">Donatur</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">{campaign.daysLeft}</div>
                      <div className="text-sm text-muted-foreground">Hari Tersisa</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(campaign.target - campaign.raised)}
                      </div>
                      <div className="text-sm text-muted-foreground">Dibutuhkan</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Content */}
              <Tabs defaultValue="story" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="story">Cerita</TabsTrigger>
                  <TabsTrigger value="updates">Update</TabsTrigger>
                  <TabsTrigger value="milestones">Milestone</TabsTrigger>
                  <TabsTrigger value="donors">Donatur</TabsTrigger>
                </TabsList>

                <TabsContent value="story" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tentang Kampanye Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-muted-foreground mb-4">{campaign.description}</p>
                        <div className="whitespace-pre-line text-sm">{campaign.fullDescription}</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="updates" className="space-y-4">
                  {campaign.updates.map((update, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{update.title}</CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {new Date(update.date).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Milestone Pencairan Dana</CardTitle>
                      <CardDescription>
                        Dana akan dicairkan secara bertahap sesuai dengan milestone yang telah ditetapkan
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {campaign.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              milestone.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {milestone.completed ? <CheckCircle className="w-5 h-5" /> : milestone.percentage + "%"}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">
                              {milestone.percentage}% - {milestone.description}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {milestone.completed ? "Selesai" : "Menunggu target tercapai"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="donors" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Donatur Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>D{index + 1}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">Donatur Anonim</div>
                            <div className="text-sm text-muted-foreground">2 hari yang lalu</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-blue-600">
                              {formatCurrency(Math.floor(Math.random() * 500000) + 50000)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Donation Sidebar */}
            <div className="space-y-6">
              {/* Fundraiser Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Penggalang Dana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>YPA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{campaign.fundraiser}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Rating {campaign.reputation}/5.0
                      </div>
                    </div>
                    {campaign.verified && (
                      <Badge className="bg-green-500 text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Donation Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Berdonasi Sekarang
                  </CardTitle>
                  <CardDescription>Pilih jumlah donasi dan metode pembayaran</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label>Pilih Jumlah Donasi</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          className="h-12"
                          onClick={() => {
                            setSelectedAmount(amount)
                            setCustomAmount("")
                          }}
                        >
                          {formatCurrency(amount)}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount">Atau masukkan jumlah lain</Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Masukkan jumlah"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                      />
                    </div>
                  </div>

                  {/* Donor Information */}
                  {/* <div className="space-y-3">
                    <Label htmlFor="donor-name">Nama Donatur</Label>
                    <Input
                      id="donor-name"
                      placeholder="Masukkan nama Anda"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Donasi sebagai anonim
                      </Label>
                    </div>
                  </div> */}

                  {/* Message */}
                  {/* <div className="space-y-2">
                    <Label htmlFor="message">Pesan Dukungan (Opsional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Tulis pesan dukungan Anda..."
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div> */}

                  {/* Payment Method */}
                  {/* <div className="space-y-3">
                    <Label>Metode Pembayaran</Label>
                    <div className="space-y-2">
                      <Button
                        variant={paymentMethod === "wallet" ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setPaymentMethod("wallet")}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Crypto Wallet
                      </Button>
                      <Button
                        variant={paymentMethod === "bank" ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setPaymentMethod("bank")}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Transfer Bank
                      </Button>
                      <Button
                        variant={paymentMethod === "ewallet" ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setPaymentMethod("ewallet")}
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        E-Wallet
                      </Button>
                    </div>
                  </div> */}

                  {/* Total */}
                  {finalAmount > 0 && (
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Donasi:</span>
                        <span className="text-xl font-bold text-purple-600">{formatCurrency(finalAmount)}</span>
                      </div>
                    </div>
                  )}

                  {/* Donate Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-blue-700 hover:to-teal-700 h-12 text-lg"
                    disabled={!finalAmount || !paymentMethod}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Donasi {finalAmount > 0 ? formatCurrency(finalAmount) : ""}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Dengan berdonasi, Anda menyetujui syarat dan ketentuan platform
                  </p>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Keamanan Terjamin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Dana disimpan di smart contract</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Transparansi penuh di blockchain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Pencairan sesuai milestone</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-muted-foreground">© 2024 FundChain. Semua hak dilindungi.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-blue-600"
          >
            Syarat & Ketentuan
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-blue-600"
          >
            Kebijakan Privasi
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-blue-600"
          >
            Kontak
          </Link>
        </nav>
      </footer>
    </div>
  )
}

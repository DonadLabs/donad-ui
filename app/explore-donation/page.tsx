import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Users, TrendingUp, Clock, Search, Filter, Heart, MapPin } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

// Mock data for campaigns
const campaigns = [
  {
    id: 1,
    title: "Bantuan Pendidikan Anak Yatim",
    description: "Membantu biaya pendidikan untuk 50 anak yatim di Jakarta Timur",
    category: "Pendidikan",
    location: "Jakarta",
    raised: 45000000,
    target: 100000000,
    donors: 234,
    daysLeft: 15,
    image: "/placeholder.svg?height=200&width=300",
    fundraiser: "Yayasan Peduli Anak",
    reputation: 4.8,
    verified: true,
  },
  {
    id: 2,
    title: "Operasi Jantung untuk Bayi Kirana",
    description: "Bayi Kirana membutuhkan operasi jantung segera untuk menyelamatkan nyawanya",
    category: "Kesehatan",
    location: "Surabaya",
    raised: 78000000,
    target: 150000000,
    donors: 456,
    daysLeft: 8,
    image: "/placeholder.svg?height=200&width=300",
    fundraiser: "Keluarga Kirana",
    reputation: 4.9,
    verified: true,
  },
  {
    id: 3,
    title: "Pembangunan Masjid Al-Hidayah",
    description: "Membangun masjid untuk masyarakat Desa Sukamaju yang belum memiliki tempat ibadah",
    category: "Keagamaan",
    location: "Bandung",
    raised: 125000000,
    target: 200000000,
    donors: 189,
    daysLeft: 22,
    image: "/placeholder.svg?height=200&width=300",
    fundraiser: "Takmir Masjid Al-Hidayah",
    reputation: 4.7,
    verified: true,
  },
  {
    id: 4,
    title: "Bantuan Korban Bencana Alam",
    description: "Membantu korban banjir di Kalimantan dengan kebutuhan pokok dan tempat tinggal sementara",
    category: "Bencana",
    location: "Kalimantan",
    raised: 89000000,
    target: 120000000,
    donors: 567,
    daysLeft: 5,
    image: "/placeholder.svg?height=200&width=300",
    fundraiser: "PMI Kalimantan",
    reputation: 4.9,
    verified: true,
  },
  {
    id: 5,
    title: "Beasiswa Mahasiswa Berprestasi",
    description: "Memberikan beasiswa untuk 20 mahasiswa berprestasi dari keluarga kurang mampu",
    category: "Pendidikan",
    location: "Yogyakarta",
    raised: 32000000,
    target: 80000000,
    donors: 123,
    daysLeft: 30,
    image: "/placeholder.svg?height=200&width=300",
    fundraiser: "Universitas Gadjah Mada",
    reputation: 4.8,
    verified: true,
  },
  {
    id: 6,
    title: "Panti Asuhan Harapan Bangsa",
    description: "Renovasi dan perbaikan fasilitas panti asuhan untuk 100 anak",
    category: "Sosial",
    location: "Medan",
    raised: 67000000,
    target: 150000000,
    donors: 298,
    daysLeft: 18,
    image: "/placeholder.svg?height=200&width=300",
    fundraiser: "Panti Asuhan Harapan Bangsa",
    reputation: 4.6,
    verified: true,
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function ExploreDonationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Donad
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <Link href="/explore-donation" className="text-sm font-medium text-blue-600">
            Jelajahi Donasi
          </Link>
          <Link href="/start-fundraising" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Mulai Fundraising
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-blue-600 to-teal-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Jelajahi Kampanye Donasi
              </h1>
              <p className="max-w-2xl text-blue-100 md:text-xl">
                Temukan kampanye fundraising yang transparan dan terpercaya. Setiap donasi Anda tercatat di blockchain.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="w-full py-8 bg-white border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Cari kampanye..." className="pl-10" />
              </div>
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="pendidikan">Pendidikan</SelectItem>
                    <SelectItem value="kesehatan">Kesehatan</SelectItem>
                    <SelectItem value="keagamaan">Keagamaan</SelectItem>
                    <SelectItem value="bencana">Bencana</SelectItem>
                    <SelectItem value="sosial">Sosial</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Lokasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Lokasi</SelectItem>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="medan">Medan</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-8 bg-gradient-to-r from-blue-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-muted-foreground">Kampanye Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-teal-600">5.6M</div>
                <div className="text-sm text-muted-foreground">Total Donatur</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-muted-foreground">Target Tercapai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-muted-foreground">Transparansi</div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaigns Grid */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-white text-gray-700">{campaign.category}</Badge>
                    {campaign.verified && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Terverifikasi
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {campaign.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Terkumpul</span>
                        <span>{Math.round((campaign.raised / campaign.target) * 100)}%</span>
                      </div>
                      <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatCurrency(campaign.raised)}</span>
                        <span>dari {formatCurrency(campaign.target)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{campaign.donors} donatur</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{campaign.daysLeft} hari lagi</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-sm">
                        <div className="font-medium">{campaign.fundraiser}</div>
                        <div className="text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Rating {campaign.reputation}
                        </div>
                      </div>
                      <Link href={`/donate/${campaign.id}`}>
                        <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                          <Heart className="w-4 h-4 mr-2" />
                          Donasi
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Muat Lebih Banyak
              </Button>
            </div>
          </div>
        </section>
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

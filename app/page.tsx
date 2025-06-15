import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, TrendingUp, Clock, FileText, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
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
          <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Cara Kerja
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Fitur
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Tentang
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Badge variant="outline" className="px-4 py-2 text-blue-600 border-blue-200">
                <Zap className="w-4 h-4 mr-2" />
                Platform Fundraising Web3
              </Badge>

              <div className="space-y-6 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Transparansi Fundraising dengan Blockchain
                </h1>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-3xl mx-auto">
                  <p className="text-lg text-red-700 font-medium">
                    💔 <strong>Masalah Saat Ini:</strong>
                  </p>
                  <p className="text-red-600 mt-2">
                    "Transaksi dari fundraiser tidak terintegrasi sehingga menyulitkan transparansi."
                  </p>
                </div>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Solusi fundraising berbasis blockchain yang memberikan transparansi penuh, sistem reputasi yang adil,
                  dan keamanan dana melalui smart contract.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/explore-donation">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 text-lg"
                  >
                    Explore Donation
                  </Button>
                </Link>
                <Link href="/start-fundraising">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                  >
                    Start Fundraising
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <Badge variant="secondary" className="px-4 py-2">
                Cara Kerja
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Sistem yang Transparan & Terpercaya
              </h2>
              <p className="max-w-3xl text-muted-foreground md:text-xl">
                Platform kami menggunakan teknologi blockchain untuk memastikan setiap transaksi tercatat dengan aman
                dan dapat diverifikasi oleh semua pihak.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {/* Reputasi Fundraiser */}
              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Reputasi Fundraiser</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-base">
                    • Menentukan siapa yang layak melakukan fundraising
                  </CardDescription>
                  <CardDescription className="text-base">
                    • Membantu donatur memilih fundraiser terpercaya
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Reputasi Donatur */}
              <Card className="border-2 hover:border-teal-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">Reputasi Donatur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-base">
                    • Donatur membangun reputasi berdasarkan total donasi
                  </CardDescription>
                  <CardDescription className="text-base">
                    • Hanya donatur dengan reputasi baik yang bisa menjadi fundraiser
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Transparansi Keuangan */}
              <Card className="border-2 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Transparansi Keuangan</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Semua transaksi ditampilkan dalam bentuk laporan keuangan yang dapat diakses publik
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Penarikan Dana */}
              <Card className="border-2 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Penarikan Dana</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Dana hanya bisa ditarik sesuai tenggat waktu yang ditentukan untuk mencegah penyalahgunaan
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Smart Contract */}
              <Card className="border-2 hover:border-green-200 transition-colors md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Smart Contract</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Dana disimpan di smart contract agar mudah dilacak dan tidak dapat disalahgunakan
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="px-4 py-2 text-blue-600 border-blue-200">
                  Keunggulan Platform
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Mengapa Memilih FundChain?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">100% Transparan</h3>
                      <p className="text-muted-foreground">
                        Setiap transaksi tercatat di blockchain dan dapat diverifikasi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Keamanan Terjamin</h3>
                      <p className="text-muted-foreground">Smart contract melindungi dana dari penyalahgunaan</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Sistem Reputasi</h3>
                      <p className="text-muted-foreground">
                        Membangun kepercayaan melalui track record yang terverifikasi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl border">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Mulai Fundraising Anda</h3>
                    <p className="text-muted-foreground">Bergabunglah dengan platform fundraising masa depan</p>
                  </div>
                  <div className="space-y-4">
                    <Link href="/explore-donation">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3">
                        Explore Donation
                      </Button>
                    </Link>
                    <Link href="/start-fundraising">
                      <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 py-3">
                        Start Fundraising
                      </Button>
                    </Link>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Gratis untuk memulai • Tanpa biaya tersembunyi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-teal-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Siap Memulai Fundraising yang Transparan?
              </h2>
              <p className="max-w-2xl text-blue-100 md:text-xl">
                Bergabunglah dengan revolusi fundraising berbasis blockchain. Bangun kepercayaan, tingkatkan
                transparansi, dan capai target fundraising Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/explore-donation">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
                    Explore Donation
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
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

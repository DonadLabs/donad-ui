import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Upload, Target, FileText, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function StartFundraisingPage() {
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
          <Link href="/start-fundraising" className="text-sm font-medium text-blue-600">
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
                Mulai Kampanye Fundraising
              </h1>
              <p className="max-w-2xl text-blue-100 md:text-xl">
                Buat kampanye fundraising yang transparan dengan teknologi blockchain. Dana Anda akan aman dan dapat
                dilacak.
              </p>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="w-full py-8 bg-white border-b">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Persyaratan Fundraiser</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      Syarat Terpenuhi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Reputasi donatur: 4.5/5.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Total donasi: Rp 5.000.000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Akun terverifikasi</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <AlertCircle className="h-5 w-5" />
                      Ketentuan Platform
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Dana disimpan dalam smart contract</p>
                    <p>• Penarikan sesuai milestone yang ditetapkan</p>
                    <p>• Laporan keuangan transparan dan publik</p>
                    <p>• Verifikasi identitas wajib</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Buat Kampanye Baru</CardTitle>
                      <CardDescription>Isi informasi lengkap tentang kampanye fundraising Anda</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Informasi Dasar
                        </h3>

                        <div className="space-y-2">
                          <Label htmlFor="title">Judul Kampanye *</Label>
                          <Input id="title" placeholder="Masukkan judul kampanye yang menarik" className="w-full" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Deskripsi Kampanye *</Label>
                          <Textarea
                            id="description"
                            placeholder="Jelaskan tujuan, latar belakang, dan mengapa kampanye ini penting..."
                            className="min-h-[120px]"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category">Kategori *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pendidikan">Pendidikan</SelectItem>
                                <SelectItem value="kesehatan">Kesehatan</SelectItem>
                                <SelectItem value="keagamaan">Keagamaan</SelectItem>
                                <SelectItem value="bencana">Bencana Alam</SelectItem>
                                <SelectItem value="sosial">Sosial</SelectItem>
                                <SelectItem value="lingkungan">Lingkungan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Lokasi *</Label>
                            <Input id="location" placeholder="Kota, Provinsi" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Financial Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Target & Timeline
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="target">Target Dana (IDR) *</Label>
                            <Input id="target" type="number" placeholder="100000000" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="deadline">Batas Waktu *</Label>
                            <Input id="deadline" type="date" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="milestones">Milestone Penarikan Dana</Label>
                          <Textarea
                            id="milestones"
                            placeholder="Jelaskan kapan dan untuk apa dana akan ditarik (contoh: 30% untuk pembelian material, 50% untuk pembangunan, 20% untuk finishing)"
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Media Upload */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Upload className="h-5 w-5" />
                          Media & Dokumen
                        </h3>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Foto/Video Kampanye *</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">Klik untuk upload atau drag & drop</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG, MP4 hingga 10MB</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Dokumen Pendukung</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                              <FileText className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                              <p className="text-xs text-gray-600">Upload dokumen pendukung (opsional)</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                          Buat Kampanye
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Simpan Draft
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Tips Card */}
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-700">Tips Sukses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Gunakan judul yang jelas dan menarik</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Sertakan foto/video berkualitas tinggi</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Jelaskan penggunaan dana secara detail</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Update progress secara berkala</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Process Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Proses Verifikasi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <span>Submit kampanye</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <span>Review tim (1-3 hari)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <span>Kampanye aktif</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats Card */}
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-700">Statistik Platform</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Kampanye Berhasil</span>
                        <span className="font-semibold text-green-600">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Rata-rata Donasi</span>
                        <span className="font-semibold text-green-600">Rp 250K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Waktu Verifikasi</span>
                        <span className="font-semibold text-green-600">2 hari</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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

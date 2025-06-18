'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Target, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { useWriteCreateFundraising } from "@/hooks/writeContracts"

export default function StartFundraisingPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [target, setTarget] = useState(0)
  const [deadline, setDeadline] = useState("")
  const {CreateFundraising} = useWriteCreateFundraising()

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setTarget(value)
  }

  function HandleSubmit(){
    const dateInSeconds = Math.floor(new Date(deadline).getTime() / 1000)
    CreateFundraising(title, description, target, dateInSeconds);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <NavBar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Mulai Kampanye Fundraising
              </h1>
              <p className="max-w-2xl text-purple-100 md:text-xl">
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

                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
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
                          <Input id="title" placeholder="Masukkan judul kampanye yang menarik" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="w-full" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Deskripsi Kampanye *</Label>
                          <Textarea
                            id="description"
                            placeholder="Jelaskan tujuan, latar belakang, dan mengapa kampanye ini penting..."
                            className="min-h-[120px]"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                          />
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
                            <Input id="target" type="number" value={target} onChange={handleTargetChange} placeholder="100000000" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="deadline">Batas Waktu *</Label>
                            <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
                          </div>
                        </div>
                      </div>
                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 cursor-pointer" onClick={HandleSubmit}>
                          Buat Kampanye
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Tips Card */}
                  <Card className="border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-700">Tips Sukses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
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
                        <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
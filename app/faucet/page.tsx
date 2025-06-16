"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Wallet, Coins, Copy, CheckCircle, AlertCircle, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FaucetPage() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastClaim, setLastClaim] = useState<Date | null>(null)
  const [claimAmount, setClaimAmount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleClaim = async () => {
    if (!walletAddress) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const amount = Math.floor(Math.random() * 5) + 1 // 1-5 tokens
    setClaimAmount(amount)
    setLastClaim(new Date())
    setShowSuccess(true)
    setIsLoading(false)

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const canClaim = !lastClaim || Date.now() - lastClaim.getTime() > 24 * 60 * 60 * 1000 // 24 hours

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

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
          <Link href="/explore-donation" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Jelajahi Donasi
          </Link>
          <Link href="/start-fundraising" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Mulai Fundraising
          </Link>
          <Link href="/faucet" className="text-sm font-medium text-blue-600">
            Faucet
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-blue-600 to-teal-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <Badge variant="outline" className="px-4 py-2 text-white border-white/20 bg-white/10">
                <Coins className="w-4 h-4 mr-2" />
                Testnet Faucet
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Donad Token Faucet
              </h1>
              <p className="max-w-2xl text-blue-100 md:text-xl">
                Dapatkan token testnet gratis untuk mencoba platform Donad. Token ini hanya untuk testing dan tidak
                memiliki nilai ekonomi.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Faucet Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Wallet className="h-6 w-6" />
                        Klaim Token Testnet
                      </CardTitle>
                      <CardDescription>
                        Masukkan alamat wallet Anda untuk mendapatkan token testnet gratis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {showSuccess && (
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-700">
                            Berhasil! {claimAmount} FUND token telah dikirim ke wallet Anda.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="wallet-address">Alamat Wallet *</Label>
                          <Input
                            id="wallet-address"
                            placeholder="0x1234567890abcdef..."
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="font-mono"
                          />
                          <p className="text-xs text-muted-foreground">
                            Masukkan alamat wallet Ethereum/Polygon yang valid
                          </p>
                        </div>

                        {!canClaim && lastClaim && (
                          <Alert className="border-orange-200 bg-orange-50">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <AlertDescription className="text-orange-700">
                              Anda sudah mengklaim token hari ini. Silakan coba lagi dalam 24 jam.
                              <br />
                              Terakhir klaim: {lastClaim.toLocaleString("id-ID")}
                            </AlertDescription>
                          </Alert>
                        )}

                        <Button
                          onClick={handleClaim}
                          disabled={!walletAddress || isLoading || !canClaim}
                          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 h-12 text-lg"
                        >
                          {isLoading ? (
                            <>
                              <Zap className="w-5 h-5 mr-2 animate-spin" />
                              Mengirim Token...
                            </>
                          ) : (
                            <>
                              <Coins className="w-5 h-5 mr-2" />
                              Klaim Token Gratis
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* How to Use */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cara Menggunakan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          1
                        </div>
                        <span>Pastikan Anda memiliki wallet Ethereum (MetaMask, Trust Wallet, dll)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          2
                        </div>
                        <span>Tambahkan network Monad Testnet ke wallet Anda</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          3
                        </div>
                        <span>Masukkan alamat wallet dan klaim token gratis</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Notes */}
                  {/* <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-700">Penting!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-orange-700">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Token ini hanya untuk testing dan tidak memiliki nilai ekonomi</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Jangan gunakan alamat wallet mainnet</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Maksimal 1 klaim per alamat per 24 jam</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Faucet dapat habis jika terlalu banyak permintaan</span>
                      </div>
                    </CardContent>
                  </Card> */}
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

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {  Wallet, Coins, CheckCircle, Zap, CircleX } from "lucide-react"
import { useState } from "react"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAccount } from "wagmi";
import { useWriteFaucetMinting } from "@/hooks/writeContracts"



export default function FaucetPage() {
  const [isLoading, setIsLoading] = useState(false)
  const claimAmount = 100000
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const {FaucetMinting} = useWriteFaucetMinting()
  const {isConnected} = useAccount()

  const handleClaim = async () => {
    if (!isConnected) return

    try {
      const tx = await FaucetMinting()
      setShowSuccess(true)
    } catch(err) {
      console.log(err)
      setShowError(true)
    }
    setIsLoading(false)

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false) 
      setShowError(false)
    }, 5000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-purple-600 to-purple-800">
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
                Dapatkan token testnet gratis untuk mencoba platform Donad.
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
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {showSuccess && (
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-700">
                            Berhasil! {claimAmount} $DON token telah dikirim ke wallet Anda.
                          </AlertDescription>
                        </Alert>
                      )}
                      {showError && (
                        <Alert className="border-red-200 bg-red-50">
                          <CircleX className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">
                            Klaim gagal!
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4">
                        <Button
                          onClick={handleClaim}
                          disabled={isLoading || !isConnected}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 h-12 text-lg"
                        >
                          {isLoading ? (
                            <>
                              <Zap className="w-5 h-5 mr-2 animate-spin" />
                              Mengirim Token...
                            </>
                          ) : (
                            <>
                              <Coins className="w-5 h-5 mr-2" />
                              Klaim Token $DON
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
                        <span>Klaim token $DON</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  )
}

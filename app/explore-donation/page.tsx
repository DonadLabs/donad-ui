"use client";

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Users, TrendingUp, Clock, Search, Filter, Heart, MapPin, Wallet, Copy } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { NavBar } from "@/components/navbar"
import { useReadGetFundraisings } from "@/hooks/readContract"
import { useFetchGetFundraisings } from "@/hooks/fetchGraphql"
import { Footer } from "@/components/footer"
import { formatAddress, formatCurrency, formatDate, getDaysLeft } from "../utils"

export default function ExploreDonationPage() {
  const getFundraisingGraphQL = useFetchGetFundraisings();
  const [campaignsGraphQLData, setCampaignsGraphQLData] = useState<any[]>([]);
  const campaigns = useReadGetFundraisings(campaignsGraphQLData.map(c => Number(c.fundraiseId)));

  useEffect(() => {
    const fetchFundraisingGraphQLData = async () => {
      try {
        const data = await getFundraisingGraphQL;
        setCampaignsGraphQLData(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchFundraisingGraphQLData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <NavBar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-[#6B46C1] to-purple-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Jelajahi Kampanye Donasi
              </h1>
              <p className="max-w-2xl text-blue-100 md:text-xl">
                Temukan kampanye fundraising yang transparan dan terpercaya.
                Setiap donasi Anda tercatat di blockchain.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        {/* <section className="w-full py-8 bg-white border-b">
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
                    <SelectItem value="test">Test</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                    <SelectItem value="new">Baru</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section> */}

        {/* Stats Section */}
        <section className="w-full py-8 bg-gradient-to-r from-blue-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {campaigns.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Kampanye Aktif
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-teal-600">
                  {campaigns.reduce((sum, c) => sum + Number(c.donorsCount), 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Donatur
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#6B46C1]">
                  {formatCurrency(campaigns.reduce(
                    (sum, c) => sum + Number(c.accumulatedAmount) / 1e6,
                    0
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Terkumpul
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">
                  Transparansi
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaigns Grid */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    Belum Ada Kampanye
                  </h3>
                  <p className="text-muted-foreground">
                    Kampanye fundraising akan muncul di sini setelah dibuat.
                  </p>
                </div>
                <Link href="/start-fundraising">
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    Buat Kampanye Pertama
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {campaigns?.map((campaign) => {
                  const progressPercentage =
                    Number(campaign.targetAmount) > 0
                      ? Math.round(
                        (Number(campaign.accumulatedAmount) /
                          Number(campaign.targetAmount)) *
                        100
                      )
                      : 0;
                  const daysLeft = getDaysLeft(Number(campaign.targetDate));
                  const isActive = daysLeft > 0;

                  return (
                    <Card
                      key={Number(campaign.id)}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gray-100 relative">
                        <Badge className="absolute top-3 left-3 bg-white text-gray-700">
                          {campaign.category}
                        </Badge>
                        {campaign.verified && (
                          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                            <Shield className="w-3 h-3 mr-1" />
                            Terverifikasi
                          </Badge>
                        )}
                        {!isActive && (
                          <Badge className="absolute bottom-3 left-3 bg-red-500 text-white">
                            Berakhir
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg line-clamp-2">
                            {campaign.title}
                          </CardTitle>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {campaign.description}
                        </CardDescription>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Wallet className="w-3 h-3" />
                          <code className="font-mono">
                            {formatAddress(campaign.fundraiser)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigator.clipboard.writeText(campaign.fundraiser)
                            }
                            className="h-4 w-4 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Terkumpul</span>
                            <span>{progressPercentage > 100 ? 100 : progressPercentage}%</span>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-2"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              {formatCurrency(Number(campaign.accumulatedAmount) / 1e6)}
                            </span>
                            <span>
                              dari {formatCurrency(Number(campaign.targetAmount) / 1e6)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{Number(campaign.donorsCount)} donatur</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {isActive ? `${daysLeft} hari lagi` : "Berakhir"}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <div>
                            Target: {formatDate(Number(campaign.targetDate))}
                          </div>
                          {Number(campaign.totalWithdrawAmount) > 0 && (
                            <div>
                              Ditarik: {Number(campaign.totalWithdrawAmount)}{" "}
                              DON
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-sm">
                            <div className="font-medium">
                              Campaign #{Number(campaign.id)}
                            </div>
                            <div className="text-muted-foreground flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {isActive ? "Aktif" : "Berakhir"}
                            </div>
                          </div>
                          <Link href={`/donate/${campaign.id}`}>
                            <Button
                              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                              disabled={!isActive}
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              {isActive ? "Donasi" : "Berakhir"}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Load More Button - only show if there are campaigns */}
            {campaigns.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="px-8">
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

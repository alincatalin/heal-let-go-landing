import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ConsentChoice = "yes" | "no" | "";

const cancelOptions = [
  "Didn't see results / didn't help",
  "Too expensive",
  "Didn't understand how to use it",
  "Found another app / solution",
  "Just wasn't ready to commit",
  "Other",
];

const returnOptions = [
  "Lower price",
  "More features",
  "Better onboarding / tutorial",
  "Longer free trial",
  "Nothing — I'm not interested",
];

const alternativeOptions = [
  "Therapy",
  "Another app",
  "Friends/family support",
  "Just trying to move on alone",
  "Other",
];

const decodeParam = (value: string | null) => {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch (_err) {
    return value;
  }
};

const toggleValue = (current: string[], value: string) => {
  if (current.includes(value)) {
    return current.filter((item) => item !== value);
  }
  return [...current, value];
};

const WinBackSurvey = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [cancelReasons, setCancelReasons] = useState<string[]>([]);
  const [cancelOther, setCancelOther] = useState("");
  const [returnReasons, setReturnReasons] = useState<string[]>([]);
  const [returnOther, setReturnOther] = useState("");
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [alternativeApp, setAlternativeApp] = useState("");
  const [alternativeOther, setAlternativeOther] = useState("");
  const [improvement, setImprovement] = useState("");
  const [consent, setConsent] = useState<ConsentChoice>("");
  const [email, setEmail] = useState(() => decodeParam(searchParams.get("email")) || decodeParam(searchParams.get("e")));
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const openTrackedRef = useRef(false);

  const trackingPayload = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    const linkId = params.link_id || params.lid || params.link || "";
    const userId = params.user_id || params.uid || params.customer_id || params.cid || "";

    return {
      link_id: linkId || null,
      user_id: userId || null,
      utm_source: params.utm_source || null,
      utm_medium: params.utm_medium || null,
      utm_campaign: params.utm_campaign || null,
      utm_content: params.utm_content || null,
      utm_term: params.utm_term || null,
      referrer: document.referrer || null,
      pathname: window.location.pathname,
      raw_params: params,
    };
  }, [searchParams]);

  useEffect(() => {
    if (openTrackedRef.current) return;
    openTrackedRef.current = true;

    const storedAnonId = localStorage.getItem("heal_winback_survey_anon_id");
    const anonId = storedAnonId || crypto.randomUUID();
    if (!storedAnonId) {
      localStorage.setItem("heal_winback_survey_anon_id", anonId);
    }

    const recordOpen = async () => {
      const response = await fetch("/winback-survey/open", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email || null,
          anonId,
          userId: trackingPayload.user_id,
          linkId: trackingPayload.link_id,
          utmSource: trackingPayload.utm_source,
          utmMedium: trackingPayload.utm_medium,
          utmCampaign: trackingPayload.utm_campaign,
          utmContent: trackingPayload.utm_content,
          utmTerm: trackingPayload.utm_term,
          referrer: trackingPayload.referrer,
          pathname: trackingPayload.pathname,
          rawParams: trackingPayload.raw_params,
        }),
      });

      if (response.ok) {
        const data = await response.json().catch(() => null);
        if (data?.eventId) {
          setOpenEventId(data.eventId);
        }
      }
    };

    void recordOpen();
  }, [email, trackingPayload]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting" || status === "submitted") return;

    const storedAnonId = localStorage.getItem("heal_winback_survey_anon_id");
    const anonId = storedAnonId || crypto.randomUUID();

    setStatus("submitting");
    const response = await fetch("/winback-survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email || null,
        anonId,
        openEventId,
        userId: trackingPayload.user_id,
        linkId: trackingPayload.link_id,
        utmSource: trackingPayload.utm_source,
        utmMedium: trackingPayload.utm_medium,
        utmCampaign: trackingPayload.utm_campaign,
        utmContent: trackingPayload.utm_content,
        utmTerm: trackingPayload.utm_term,
        referrer: trackingPayload.referrer,
        pathname: trackingPayload.pathname,
        rawParams: trackingPayload.raw_params,
        cancelReasons,
        cancelReasonOther: cancelOther.trim() || null,
        returnReasons,
        returnReasonOther: returnOther.trim() || null,
        alternatives,
        alternativeApp: alternativeApp.trim() || null,
        alternativeOther: alternativeOther.trim() || null,
        improvement: improvement.trim() || null,
        consent: consent || null,
      }),
    });

    if (!response.ok) {
      setStatus("idle");
      toast({
        title: "Something went wrong",
        description: "We couldn't save your response. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    setStatus("submitted");
    toast({
      title: "Thank you",
      description: "Your answers have been saved.",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse" />
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-gradient-accent opacity-20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Heal win-back survey</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Help us make Heal worth coming back to.
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              2-3 minutes. Your feedback directly shapes the next version of Heal.
            </p>
          </div>

          <Card className="border-border/60 bg-card/80 shadow-glow">
            <CardHeader className="space-y-2">
              <CardTitle>Quick survey</CardTitle>
              <CardDescription>
                We only ask what we plan to act on. You can leave anything blank.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    If this was prefilled from your link, feel free to edit it.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Why did you cancel your Heal trial?</h3>
                    <p className="text-sm text-muted-foreground">Select all that apply.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {cancelOptions.map((option) => (
                      <label key={option} className="flex items-start gap-3 rounded-md border border-border/60 p-3">
                        <Checkbox
                          checked={cancelReasons.includes(option)}
                          onCheckedChange={() => setCancelReasons((current) => toggleValue(current, option))}
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {cancelReasons.includes("Other") && (
                    <Input
                      placeholder="Tell us what happened"
                      value={cancelOther}
                      onChange={(event) => setCancelOther(event.target.value)}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">What would make you come back to Heal?</h3>
                    <p className="text-sm text-muted-foreground">Select all that apply.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {returnOptions.map((option) => (
                      <label key={option} className="flex items-start gap-3 rounded-md border border-border/60 p-3">
                        <Checkbox
                          checked={returnReasons.includes(option)}
                          onCheckedChange={() => setReturnReasons((current) => toggleValue(current, option))}
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {returnReasons.includes("More features") && (
                    <Input
                      placeholder="Which features would matter most?"
                      value={returnOther}
                      onChange={(event) => setReturnOther(event.target.value)}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Are you using something else to help with your breakup?</h3>
                    <p className="text-sm text-muted-foreground">Select all that apply.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {alternativeOptions.map((option) => (
                      <label key={option} className="flex items-start gap-3 rounded-md border border-border/60 p-3">
                        <Checkbox
                          checked={alternatives.includes(option)}
                          onCheckedChange={() => setAlternatives((current) => toggleValue(current, option))}
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {alternatives.includes("Another app") && (
                    <Input
                      placeholder="Which app?"
                      value={alternativeApp}
                      onChange={(event) => setAlternativeApp(event.target.value)}
                    />
                  )}
                  {alternatives.includes("Other") && (
                    <Input
                      placeholder="Tell us more"
                      value={alternativeOther}
                      onChange={(event) => setAlternativeOther(event.target.value)}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">One thing we could improve</h3>
                  <Textarea
                    placeholder="Share the one change that would move the needle for you."
                    value={improvement}
                    onChange={(event) => setImprovement(event.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Can we email you in the future with updates, tips, or special offers?</h3>
                  <RadioGroup value={consent} onValueChange={(value) => setConsent(value as ConsentChoice)}>
                    <label htmlFor="consent-yes" className="flex items-center gap-3 rounded-md border border-border/60 p-3">
                      <RadioGroupItem id="consent-yes" value="yes" />
                      <span className="text-sm">Yes, keep me in the loop</span>
                    </label>
                    <label htmlFor="consent-no" className="flex items-center gap-3 rounded-md border border-border/60 p-3">
                      <RadioGroupItem id="consent-no" value="no" />
                      <span className="text-sm">No, please remove me</span>
                    </label>
                  </RadioGroup>
                </div>

                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs text-muted-foreground">
                    We store your response securely in our internal analytics. No spam.
                  </p>
                  <Button type="submit" size="lg" disabled={status === "submitting" || status === "submitted"}>
                    {status === "submitted" ? "Submitted" : status === "submitting" ? "Submitting..." : "Send feedback"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WinBackSurvey;

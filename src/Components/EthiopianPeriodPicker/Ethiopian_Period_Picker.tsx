import { useState } from "react"
import { Button, Popover, Select, Group, Stack, Text, Grid, ActionIcon, Paper, ScrollArea } from "../../../libs"
import { IconCalendarMonth, IconChevronLeft, IconChevronRight, IconCheck, IconLanguage } from "../../../libs"

import styles from './period_picker.module.css'
interface PeriodPickerProps {
    value?: { type: "monthly" | "yearly"; period: string; year: string }
    onChange?: (value: {
        type: "monthly" | "yearly"
        period: string
        year: string
        label: string
        startDate: string
        endDate: string
    }) => void
    placeholder?: string
}

export function EthiopianPeriodPicker({ value, onChange, placeholder }: PeriodPickerProps) {
    const [opened, setOpened] = useState(false)
    const [selectedType, setSelectedType] = useState<"monthly" | "yearly">(value?.type || "monthly")
    const [selectedYear, setSelectedYear] = useState(value?.year || "2017")
    const [selectedPeriod, setSelectedPeriod] = useState(value?.period || "")
    const [language, setLanguage] = useState<"en" | "am">("en")

    const translations = {
        en: {
            selectPeriod: "Select period",
            monthly: "Monthly",
            yearly: "Yearly",
            selectMonth: "Select Month",
            fiscalYear: "Fiscal Year",
            selectFY: "Select FY",
            fullFiscalYear: "Full fiscal year from Hamle to Sene",
            months: [
                { value: "1", name: "Meskerem", gregorian: "Sep-Oct" },
                { value: "2", name: "Tikimt", gregorian: "Oct-Nov" },
                { value: "3", name: "Hidar", gregorian: "Nov-Dec" },
                { value: "4", name: "Tahsas", gregorian: "Dec-Jan" },
                { value: "5", name: "Tir", gregorian: "Jan-Feb" },
                { value: "6", name: "Yekatit", gregorian: "Feb-Mar" },
                { value: "7", name: "Megabit", gregorian: "Mar-Apr" },
                { value: "8", name: "Miazia", gregorian: "Apr-May" },
                { value: "9", name: "Ginbot", gregorian: "May-Jun" },
                { value: "10", name: "Sene", gregorian: "Jun-Jul" },
                { value: "11", name: "Hamle", gregorian: "Jul-Aug" },
                { value: "12", name: "Nehase", gregorian: "Aug-Sep" },
                { value: "13", name: "Pagume", gregorian: "Sep (5-6 days)" },
            ],
        },
        am: {
            selectPeriod: "ጊዜ ይምረጡ",
            monthly: "ወርሃዊ",
            yearly: "ዓመታዊ",
            selectMonth: "ወር ይምረጡ",
            fiscalYear: "የበጀት ዓመት",
            selectFY: "የበጀት ዓመት ይምረጡ",
            fullFiscalYear: "ከሐምሌ እስከ ሰኔ ሙሉ የበጀት ዓመት",
            months: [
                { value: "1", name: "መስከረም", gregorian: "ሴፕ-ኦክት" },
                { value: "2", name: "ጥቅምት", gregorian: "ኦክት-ኖቭ" },
                { value: "3", name: "ህዳር", gregorian: "ኖቭ-ዲሴ" },
                { value: "4", name: "ታህሳስ", gregorian: "ዲሴ-ጃን" },
                { value: "5", name: "ጥር", gregorian: "ጃን-ፌብ" },
                { value: "6", name: "የካቲት", gregorian: "ፌብ-ማርች" },
                { value: "7", name: "መጋቢት", gregorian: "ማርች-ኤፕሪል" },
                { value: "8", name: "ሚያዝያ", gregorian: "ኤፕሪል-ሜይ" },
                { value: "9", name: "ግንቦት", gregorian: "ሜይ-ጁን" },
                { value: "10", name: "ሰኔ", gregorian: "ጁን-ጁላይ" },
                { value: "11", name: "ሐምሌ", gregorian: "ጁላይ-ኦገስት" },
                { value: "12", name: "ነሐሴ", gregorian: "ኦገስት-ሴፕ" },
                { value: "13", name: "ጳጉሜ", gregorian: "ሴፕ (5-6 ቀናት)" },
            ],
        },
    }

    const t = translations[language]
    const ethiopianMonths = t.months

    const getGregorianDates = (ethiopianYear: string, monthValue?: string) => {
        const ethYear = Number.parseInt(ethiopianYear)
        const gregorianYear = ethYear + 7 // Ethiopian year is 7-8 years behind Gregorian

        if (monthValue) {
            // Monthly period calculation
            const month = Number.parseInt(monthValue)
            let startDate: Date
            let endDate: Date

            if (month <= 12) {
                // Regular months (30 days each)
                const startMonth = month + 8 // Ethiopian new year starts in September (month 9)
                const startYear = startMonth > 12 ? gregorianYear + 1 : gregorianYear
                const adjustedStartMonth = startMonth > 12 ? startMonth - 12 : startMonth

                startDate = new Date(startYear, adjustedStartMonth - 1, month === 1 ? 11 : 11) // Ethiopian months start around 11th
                endDate = new Date(startYear, adjustedStartMonth - 1, month === 1 ? 10 : 10)
                endDate.setMonth(endDate.getMonth() + 1) // Move to next month, then subtract 1 day
                endDate.setDate(endDate.getDate() - 1)
            } else {
                // Pagume (13th month) - 5 or 6 days in September
                const isLeapYear = (gregorianYear + 1) % 4 === 0
                startDate = new Date(gregorianYear + 1, 8, 6) // September 6
                endDate = new Date(gregorianYear + 1, 8, isLeapYear ? 11 : 10) // September 10 or 11
            }

            return {
                startDate: startDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
                endDate: endDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
            }
        } else {
            // Yearly period (full fiscal year from Hamle to Sene)
            const startDate = new Date(gregorianYear, 6, 8) // July 8 (Hamle 1)
            const endDate = new Date(gregorianYear + 1, 6, 7) // July 7 next year (end of Sene)

            return {
                startDate: startDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
                endDate: endDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
            }
        }
    }

    const currentEthiopianYear = 2017
    const fiscalYears = Array.from({ length: 10 }, (_, i) => (currentEthiopianYear - i).toString())

    const getDisplayValue = () => {
        if (!selectedPeriod && selectedType === "yearly") {
            return `FY ${selectedYear} E.C.`
        }
        if (selectedPeriod && selectedType === "monthly") {
            const month = ethiopianMonths.find((m) => m.value === selectedPeriod)
            return `${month?.name} ${selectedYear} E.C.`
        }
        if (selectedType === "yearly") {
            return `FY ${selectedYear} E.C.`
        }
        return placeholder || t.selectPeriod
    }

    const handleSelection = (type: "monthly" | "yearly", period: string) => {
        setSelectedPeriod(period)
        const label =
            type === "yearly"
                ? `FY ${selectedYear} E.C.`
                : `${ethiopianMonths.find((m) => m.value === period)?.name} ${selectedYear} E.C.`

        const dates = getGregorianDates(selectedYear, type === "monthly" ? period : undefined)

        onChange?.({
            type,
            period,
            year: selectedYear,
            label,
            startDate: dates.startDate,
            endDate: dates.endDate,
        })
        setOpened(false)
    }

    const handleYearlySelect = () => {
        handleSelection("yearly", selectedYear)
    }

    return (
        <Popover opened={opened} onChange={setOpened} position="bottom-start" width={320}>
            <Popover.Target>
                <Button
                    // variant="outline"
                    // fullWidth
                    justify="space-between"
                    leftSection={<IconCalendarMonth size={16} />}
                    onClick={() => setOpened(!opened)}
                    className={styles.button}
                >
                    {getDisplayValue()}
                </Button>
            </Popover.Target>
            <Popover.Dropdown p="md">
                <Stack gap="md">
                    <Group justify="space-between" align="center">
                        <Text size="sm" fw={500}>
                            {language === "en" ? "Period Selector" : "የጊዜ መምረጫ"}
                        </Text>
                        <Button
                            variant="subtle"
                            size="xs"
                            leftSection={<IconLanguage size={14} />}
                            onClick={() => setLanguage(language === "en" ? "am" : "en")}
                        >
                            {language === "en" ? "አማ" : "EN"}
                        </Button>
                    </Group>

                    <Paper p={4} bg="gray.1" radius="md">
                        <Group gap={4}>
                            <Button
                                variant={selectedType === "monthly" ? "filled" : "subtle"}
                                size="xs"
                                flex={1}
                                onClick={() => setSelectedType("monthly")}
                            >
                                {t.monthly}
                            </Button>
                            <Button
                                variant={selectedType === "yearly" ? "filled" : "subtle"}
                                size="xs"
                                flex={1}
                                onClick={() => setSelectedType("yearly")}
                            >
                                {t.yearly}
                            </Button>
                        </Group>
                    </Paper>

                    <Group gap="xs" align="center">
                        <ActionIcon
                            variant="outline"
                            color="#2d3748"
                            size="sm"
                            onClick={() => {
                                const currentIndex = fiscalYears.indexOf(selectedYear)
                                if (currentIndex < fiscalYears.length - 1) {
                                    setSelectedYear(fiscalYears[currentIndex + 1])
                                }
                            }}
                            disabled={fiscalYears.indexOf(selectedYear) === fiscalYears.length - 1}
                        >
                            <IconChevronLeft size={14} color="#2d3748" />
                        </ActionIcon>

                        <Select
                            value={selectedYear}
                            onChange={(value) => value && setSelectedYear(value)}
                            data={fiscalYears.map((year) => ({
                                value: year,
                                label: `FY ${year} E.C.`,
                            }))}
                            flex={1}
                            size="xs"
                        />

                        <ActionIcon
                            variant="outline"
                            color="#2d3748"
                            size="sm"
                            onClick={() => {
                                const currentIndex = fiscalYears.indexOf(selectedYear)
                                if (currentIndex > 0) {
                                    setSelectedYear(fiscalYears[currentIndex - 1])
                                }
                            }}
                            disabled={fiscalYears.indexOf(selectedYear) === 0}
                        >
                            <IconChevronRight size={14} color="#2d3748" />
                        </ActionIcon>
                    </Group>

                    {selectedType === "monthly" && (
                        <Stack gap="sm">
                            <Text size="sm" fw={500}>
                                {t.selectMonth}
                            </Text>
                            {/* <Box style={{ maxHeight: 200, overflowY: "auto", overflowX: "hidden" }}> */}
                            <ScrollArea h={200} type="auto">
                                <Grid gutter="xs">
                                    {ethiopianMonths.map((month) => (
                                        <Grid.Col span={6} key={month.value}>
                                            <Button
                                                variant={selectedPeriod === month.value && selectedType === "monthly" ? "filled" : "subtle"}
                                                size="sm"
                                                // fullWidth
                                                justify="flex-start"
                                                onClick={() => handleSelection("monthly", month.value)}
                                                rightSection={
                                                    selectedPeriod === month.value && selectedType === "monthly" ? <IconCheck size={12} /> : null
                                                }
                                                styles={{
                                                    inner: { justifyContent: "flex-start" },
                                                    label: { textAlign: "left" },
                                                }}
                                            >
                                                <Stack gap={0} align="flex-start">
                                                    <Text size="xs" fw={500}>
                                                        {month.name}
                                                    </Text>
                                                    <Text size="xs" opacity={0.7}>
                                                        {month.gregorian}
                                                    </Text>
                                                </Stack>
                                            </Button>
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            </ScrollArea>
                        </Stack>
                    )}

                    {selectedType === "yearly" && (
                        <Stack gap="sm">
                            <Text size="sm" fw={500}>
                                {t.fiscalYear}
                            </Text>
                            <Button fullWidth onClick={handleYearlySelect}>
                                {t.selectFY} {selectedYear} E.C.
                            </Button>
                            <Text size="xs" c="dimmed" ta="center">
                                {t.fullFiscalYear}
                            </Text>
                        </Stack>
                    )}
                </Stack>
            </Popover.Dropdown>
        </Popover>
    )
}

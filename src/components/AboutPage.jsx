import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Header from './Header'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 4320

// ─── Layout Shell ────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`

const ScrollSpacer = styled.div`
  width: 1px;
  visibility: hidden;
  pointer-events: none;
  height: ${({ $scale }) => DESIGN_HEIGHT * $scale}px;
`

const ScalableContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${DESIGN_WIDTH}px;
  height: ${DESIGN_HEIGHT}px;
  transform-origin: top left;
  transform: scale(${({ $scale }) => $scale});
  border: none;
`

const StyledFrame = styled.div`
  width: 1920px;
  height: ${DESIGN_HEIGHT}px;
  position: relative;
  background: white;
  overflow: hidden;
`

// ─── Background gradient (starts at 890px) ───────────────────────────────────

const StyledGradientBg = styled.div`
  position: absolute;
  top: 890px;
  left: 0;
  width: 1920px;
  height: 3430px;
  background: linear-gradient(180deg, rgba(255,255,255,1) 37%, rgba(151,151,156,1) 47%, rgba(96,96,104,1) 62%, rgba(51,51,61,1) 96%);
`

// ─── Grid Lines ───────────────────────────────────────────────────────────────

const StyledLeftMarginStrip = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  width: 1.5px;
  height: ${DESIGN_HEIGHT}px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledRightMarginStrip = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  width: 1.5px;
  height: ${DESIGN_HEIGHT}px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledTopLine = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  width: 1920px;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledHeaderBottomLine = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 1920px;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider = styled.div`
  position: absolute;
  top: 15px;
  left: 548px;
  width: 1.5px;
  height: 76px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider2 = styled.div`
  position: absolute;
  top: 15px;
  left: 844px;
  width: 1.5px;
  height: 75px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider3 = styled.div`
  position: absolute;
  top: 16px;
  left: 1118px;
  width: 1.5px;
  height: 1049px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider4 = styled.div`
  position: absolute;
  top: 16px;
  left: 1318px;
  width: 1.5px;
  height: 2130px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledHLine = styled.div`
  position: absolute;
  height: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.top         { top: 15px;   left: 0;      width: 1920px; }
  &.section-1   { top: 1070px; left: 0;      width: 1920px; }
  &.section-2   { top: 2145px; left: 0;      width: 1920px; }
  &.section-3   { top: 3220px; left: 1px;    width: 1920px; }
  &.bottom      { top: 4199px; left: 0;      width: 1920px; }
  &.hero-line   { top: 784px;  left: 470px;  width: 650px;  }
  &.contact-top { top: 1004px; left: 1120px; width: 200px;  }
  &.contact-bot { top: 1070px; left: 1119px; width: 201px;  }
  &.about-line  { top: 1004px; left: 196px;  width: 1006px; }
  &.stat-line-1 { top: 1390px; left: 1463px; width: 300px;  }
  &.stat-line-2 { top: 1610px; left: 1463px; width: 300px;  }
  &.stat-line-3 { top: 1830px; left: 1463px; width: 300px;  }
`

const StyledContactBoxVLine = styled.div`
  position: absolute;
  width: 1.5px;
  background: #9C9E9D;
  z-index: 100;

  &.left  { top: 1004px; left: 1118px; height: 66px; }
  &.right { top: 1004px; left: 1318px; height: 67px; }
`

const StyledDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  box-sizing: border-box;
  background: white;
  border: 1px solid #9c9e9d;
  border-radius: 50%;
  z-index: 150;
`

// ─── Hero / Intro ─────────────────────────────────────────────────────────────

const StyledBolaiteBrand = styled.div`
  position: absolute;
  top: 818px;
  left: 826px;
  width: 264px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: #98989a;
  text-align: right;
  white-space: nowrap;
`

const StyledHeroText = styled.p`
  position: absolute;
  top: 893px;
  left: -50px;
  width: 1140px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 25px;
  text-align: right;
  line-height: 1.5;
  margin: 0;
`

const StyledHeroTextGray = styled.span`
  color: #9c9e9d;
`

const StyledHeroTextBlue = styled.span`
  color: #000f46;
  font-weight: 700;
`

const StyledServiceDesc = styled.div`
  position: absolute;
  top: 609px;
  left: 1336px;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 40px;
  color: #9c9e9d;
  line-height: 1.4;
`

// ─── СВЯЗАТЬСЯ ────────────────────────────────────────────────────────────────

const StyledContactBox = styled.button`
  position: absolute;
  top: 1025px;
  left: 1147px;
  width: 142px;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #000f46;
  text-align: right;
  white-space: nowrap;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 11;

  &:hover { color: #575757; }
`

// ─── About / Manufacturer ─────────────────────────────────────────────────────

const StyledAboutLabel = styled.div`
  position: absolute;
  top: 1126px;
  left: 118px;
  width: 556px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: #cbcbd2;
  letter-spacing: 0.5px;
  white-space: nowrap;
`

const StyledAboutTitle = styled.div`
  position: absolute;
  top: 1210px;
  left: 118px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 52px;
  color: #000f46;
  text-align: right;
`

const StyledAboutDesc = styled.p`
  position: absolute;
  top: 1277px;
  left: 118px;
  width: 1140px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 25px;
  color: #9c9e9d;
  line-height: 1.5;
  margin: 0;
`

// ─── Stats ────────────────────────────────────────────────────────────────────

const StyledStatItem = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 32px;
  color: #9c9e9d;
  text-align: center;
  z-index: 100;

  &.stat-1 { top: 1300px; left: 1405px; width: 416px; }
  &.stat-2 { top: 1441px; left: 1531px; width: 164px; }
  &.stat-3 { top: 1681px; left: 1551px; width: 124px; }
`

// ─── Circle decoration ───────────────────────────────────────────────────────

const StyledCircle = styled.div`
  position: absolute;
  top: 1510px;
  left: 600px;
  width: 461px;
  height: 458px;
  border-radius: 50%;
  border: 2px solid #757575;
  z-index: 1;
`

// ─── Certificates Section ─────────────────────────────────────────────────────

const StyledCertTitle = styled.div`
  position: absolute;
  top: 2194px;
  left: 330px;
  font-family: Inter, sans-serif;
  font-weight: 200;
  font-size: 130px;
  color: white;
  letter-spacing: 1.3px;
`

const StyledCertDesc = styled.p`
  position: absolute;
  top: 2348px;
  left: 162px;
  width: 1140px;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 23.5px;
  color: white;
  text-align: right;
  line-height: 1.5;
  margin: 0;
`

const StyledCertLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: white;
  text-align: center;
  line-height: 1.5;

  &.c1  { top: 2809px; left: 1487px; width: 243px; }
  &.c2  { top: 3140px; left: 1052px; width: 155px; }
  &.c3  { top: 3140px; left: 813px;  width: 155px; }
  &.c4  { top: 2482px; left: 1532px; width: 155px; }
  &.c5  { top: 3140px; left: 581px;  width: 155px; }
  &.c6  { top: 3140px; left: 349px;  width: 155px; }
  &.c7  { top: 3140px; left: 117px;  width: 155px; }
  &.c8  { top: 2818px; left: 349px;  width: 155px; }
  &.c9  { top: 2809px; left: 580px;  width: 155px; }
  &.c10 { top: 2809px; left: 766px;  width: 247px; }
  &.c11 { top: 2809px; left: 1073px; width: 247px; }
`

// ─── Product Images ───────────────────────────────────────────────────────────

const StyledImg = styled.img`
  position: absolute;
  object-fit: cover;
  z-index: 100;

  &.logo-badge  { top: 355px;  left: 177px;  width: 819px;  height: 197px; object-fit: contain; }
  &.compressor  { top: 1353px; left: 330px;  width: 622px;  height: 728px; object-fit: contain; }
  &.detail-1    { top: 1457px; left: 844px;  width: 138px;  height: 136px; }
  &.detail-4    { top: 1599px; left: 967px;  width: 138px;  height: 139px; }
  &.detail-10   { top: 1800px; left: 943px;  width: 140px;  height: 139px; }
  &.detail-11   { top: 1889px; left: 780px;  width: 142px;  height: 139px; }
  /* сертификаты — координаты точно из автогена */
  &.cert-iso1   { top: 2870px; left: 797px;  width: 186px; height: 262px; }
  &.cert-007    { top: 2870px; left: 1030px; width: 193px; height: 266px; }
  &.cert-snip   { top: 2868px; left: 568px;  width: 182px; height: 264px; }
  &.cert-ce     { top: 2538px; left: 564px;  width: 189px; height: 267px; }
  &.cert-0504   { top: 2210px; left: 1422px; width: 375px; height: 265px; }
  &.cert-5651   { top: 2538px; left: 796px;  width: 187px; height: 265px; }
  &.cert-2360   { top: 2538px; left: 1422px; width: 375px; height: 266px; }
  &.cert-8913   { top: 2538px; left: 1030px; width: 345px; height: 267px; }
  &.cert-7810   { top: 2868px; left: 333px;  width: 187px; height: 264px; }
  &.cert-4051   { top: 2868px; left: 103px;  width: 187px; height: 264px; }
  &.cert-3887   { top: 2538px; left: 333px;  width: 187px; height: 265px; }
`

// ─── Form ─────────────────────────────────────────────────────────────────────

const StyledFormSection = styled.section`
  position: absolute;
  top: 3220px;
  left: 0;
  width: 1920px;
`

const StyledFormTitle = styled(motion.div)`
  position: absolute;
  top: 220px;
  left: 450px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 60px;
  color: white;
  text-align: center;
  white-space: nowrap;
`

const StyledFormSubtext = styled.p`
  position: absolute;
  top: 313px;
  left: 870px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #d9d9d9;
  line-height: 1.5;
  margin: 0;
`

const StyledFormRow = styled.div`
  position: absolute;
  top: 603px;
  left: 262px;
  width: 1402px;
  height: 59px;
`

const StyledFormFieldWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  &.field-name  { left: 0;      width: 366px; }
  &.field-phone { left: 520px;  width: 366px; }
  &.field-email { left: 1030px; width: 366px; }
`

const StyledFormUnderline = styled.div`
  width: 100%;
  height: 1.5px;
  background: #9C9E9D;
`

const StyledFormInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 24px;
  color: white;
  padding: 0;
  height: 27px;

  &::placeholder { color: transparent; }
`

const StyledFormLabel = styled.label`
  margin-top: 6px;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 24px;
  color: white;
`

const StyledSubmitWrapper = styled.div`
  position: absolute;
  top: 783px;
  left: 807px;
  width: 308px;
  height: 64px;
`

const StyledSubmitDot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 6px;
  z-index: 2;
  pointer-events: none;
`

const StyledSubmitButton = styled.button`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 302px;
  height: 60px;
  background: transparent;
  border: 1px solid #868686;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: white;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: 0;
  }

  &:hover::after { transform: scaleX(1); }
  &:hover span   { color: #272B37; }
  &:disabled     { opacity: 0.7; cursor: not-allowed; }

  span {
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }
`

const StyledFormStatus = styled.div`
  position: absolute;
  top: 863px;
  left: 807px;
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: ${({ $error }) => ($error ? '#f44336' : '#4caf50')};
`

// ─── Footer ──────────────────────────────────────────────────────────────────

const StyledFooter = styled.footer`
  position: absolute;
  top: 4223px;
  left: 0;
  width: 1920px;
  text-align: center;
`

const StyledFooterText = styled.p`
  font-family: Inter, sans-serif;
  font-weight: 200;
  font-size: 16px;
  color: white;
  line-height: 1.6;
  margin: 0 auto;
`

// ─── Dots ─────────────────────────────────────────────────────────────────────

const DOT_POSITIONS = [
  { top: 1067, left: 1316 },
  { top: 1067, left: 1116 },
  { top: 1001, left: 1316 },
  { top: 1001, left: 1116 },
  { top: 11,   left: 28   },
  { top: 86,   left: 28   },
  { top: 11,   left: 545  },
  { top: 86,   left: 545  },
  { top: 12,   left: 840  },
  { top: 86,   left: 840  },
  { top: 12,   left: 1115 },
  { top: 85,   left: 1115 },
  { top: 12,   left: 1315 },
  { top: 86,   left: 1315 },
  { top: 12,   left: 1885 },
  { top: 86,   left: 1885 },
]

const IMG = (name) => `/src/frontend/images/aboutus/${name}`

// ─── Component ───────────────────────────────────────────────────────────────

const AboutPage = () => {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [formStatus, setFormStatus] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH)
    window.addEventListener('resize', updateScale)
    updateScale()
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success !== false) {
        setFormStatus('success')
        setFormData({ name: '', phone: '', email: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <PageWrapper>
      <ScrollSpacer $scale={scale} />
      <ScalableContent $scale={scale}>
        <StyledFrame>

          {/* ── Background ── */}
          <StyledGradientBg />

          {/* ── Grid ── */}
          <StyledLeftMarginStrip />
          <StyledRightMarginStrip />
          <StyledTopLine />
          <StyledHeaderBottomLine />
          <StyledVDivider />
          <StyledVDivider2 />
          <StyledVDivider3 />
          <StyledVDivider4 />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="bottom" />
          <StyledHLine className="hero-line" />
          <StyledHLine className="contact-top" />
          <StyledHLine className="contact-bot" />
          <StyledHLine className="about-line" />
          <StyledHLine className="stat-line-1" />
          <StyledHLine className="stat-line-2" />
          <StyledHLine className="stat-line-3" />

          <StyledContactBoxVLine className="left" />
          <StyledContactBoxVLine className="right" />

          {DOT_POSITIONS.map((pos, i) => (
            <StyledDot key={i} style={{ top: pos.top, left: pos.left }} />
          ))}

          {/* ── Header ── */}
          <Header />

          {/* ── Hero ── */}
          <StyledImg className="logo-badge" src={IMG('14 - 6 1.png')} alt="Bolaite" />

          <StyledServiceDesc>
            Поставка и обслуживание<br />
            компрессорного<br />
            и воздухоразделительного<br />
            оборудования
          </StyledServiceDesc>

          <StyledBolaiteBrand>Bolaite ---</StyledBolaiteBrand>

          <StyledHeroText>
            <StyledHeroTextGray>
              надежное решение для подачи сжатого воздуха<br />
            </StyledHeroTextGray>
            <StyledHeroTextBlue>Свяжитесь</StyledHeroTextBlue>
            <StyledHeroTextGray>
              {' '}с нами и получите качественные компрессоры для вашего бизнеса
            </StyledHeroTextGray>
          </StyledHeroText>

          <StyledContactBox type="button">СВЯЗАТЬСЯ</StyledContactBox>

          {/* ── About Section ── */}
          <StyledAboutLabel>О ПРОИЗВОДИТЕЛЕ:</StyledAboutLabel>

          <StyledAboutTitle>Дочерняя компания Atlas Copco,</StyledAboutTitle>

          <StyledAboutDesc>
            специализирующаяся<br />
            на предоставлении передовых решений для повышения эффективности производства,<br />
            является проверенным и зарекомендовавшим себя производителем.
          </StyledAboutDesc>

          {/* ── Main product image + details ── */}
          <StyledImg className="compressor" src={IMG('blt-s-pm-6-800-550-1 (1) 1.png')} alt="Компрессор Bolaite" />
          <StyledImg className="detail-1"   src={IMG('detail1.jpg 1.png')}  alt="Деталь 1" />
          <StyledImg className="detail-4"   src={IMG('detail4.jpg 1.png')}      alt="Деталь 4" />
          <StyledImg className="detail-10"  src={IMG('detail10.jpg 1.png')} alt="Деталь 10" />
          <StyledImg className="detail-11"  src={IMG('detail11.jpg 1.png')} alt="Деталь 11" />

          {/* ── Stats ── */}
          <StyledStatItem className="stat-1">
            1 КЛАСС<br />ЭНЕРГОЭФФЕКТИВНОСТИ
          </StyledStatItem>
          <StyledStatItem className="stat-2">
            20 ЛЕТ<br />НА РЫНКЕ
          </StyledStatItem>
          <StyledStatItem className="stat-3">
            150 ЛЕТ<br />ОПЫТА
          </StyledStatItem>

          <StyledCircle />

          {/* ── Certificates Section ── */}
          <StyledCertTitle>СЕРТИФИКАТЫ</StyledCertTitle>

          <StyledCertDesc>
            Bolaite имеет сертификаты LRQA (Liyd`s Register Quality Asserance, Великобритания)<br />
            по стандартам ISO9001, ISO14001 и OHSAS18001
          </StyledCertDesc>

          {/* картинки сертификатов — координаты точно из автогена */}
          <StyledImg className="cert-iso1" src={IMG('泛亚ISO-英文 1.png')}                    alt="ISO" />
          <StyledImg className="cert-007"  src={IMG('照片-007 1.png')}                        alt="007" />
          <StyledImg className="cert-snip" src={IMG('Snipaste_2021-03-23_14-10-30 1.png')}   alt="Snipaste" />
          <StyledImg className="cert-ce"   src={IMG('CE认证-scaled 1.png')}                   alt="CE" />
          <StyledImg className="cert-0504" src={IMG('20170310190415_0504 1.png')}             alt="0504" />
          <StyledImg className="cert-5651" src={IMG('20170310190340_5651 1.png')}             alt="5651" />
          <StyledImg className="cert-2360" src={IMG('20170310190302_2360 1.png')}             alt="2360" />
          <StyledImg className="cert-8913" src={IMG('20170310190224_8913 1.png')}             alt="8913" />
          <StyledImg className="cert-7810" src={IMG('20170310190147_7810 1.png')}             alt="7810" />
          <StyledImg className="cert-4051" src={IMG('20170310190114_4051 1.png')}             alt="4051" />
          <StyledImg className="cert-3887" src={IMG('20170310190041_3887 1.png')}             alt="3887" />

          {/* подписи — координаты точно из автогена */}
          <StyledCertLabel className="c1">Сертификат собрание<br />иностранных инвестиций Bolaite</StyledCertLabel>
          <StyledCertLabel className="c2">Письмо-рекларация<br />Atlas Copco</StyledCertLabel>
          <StyledCertLabel className="c3">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c4">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c5">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c6">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c7">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c8">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c9">Письмо-декларация<br />Atlas Copco</StyledCertLabel>
          <StyledCertLabel className="c10">Лицензия Atlas Copco<br />Bolaite Compressor Bushes</StyledCertLabel>
          <StyledCertLabel className="c11">Разрешение на производство<br />компрессора Bolaite</StyledCertLabel>

          {/* ── Form ── */}
          <StyledFormSection aria-label="Оставить заявку">
            <StyledFormTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ОСТАВИТЬ ЗАЯВКУ
            </StyledFormTitle>

            <StyledFormSubtext>
              Поможем подобрать компрессор,<br />
              соответствующий вашим запросам
            </StyledFormSubtext>

            <form onSubmit={handleSubmit} noValidate style={{ position: 'relative' }}>
              <StyledFormRow>
                <StyledFormFieldWrapper className="field-name">
                  <StyledFormInput id="name-input" type="text"  name="name"  value={formData.name}  onChange={handleChange} aria-label="Имя" />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="name-input">ИМЯ</StyledFormLabel>
                </StyledFormFieldWrapper>

                <StyledFormFieldWrapper className="field-phone">
                  <StyledFormInput id="phone-input" type="tel"  name="phone" value={formData.phone} onChange={handleChange} aria-label="Номер телефона" />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="phone-input">НОМЕР ТЕЛЕФОНА</StyledFormLabel>
                </StyledFormFieldWrapper>

                <StyledFormFieldWrapper className="field-email">
                  <StyledFormInput id="email-input" type="email" name="email" value={formData.email} onChange={handleChange} aria-label="Электронная почта" />
                  <StyledFormUnderline />
                  <StyledFormLabel htmlFor="email-input">ЭЛЕКТРОННАЯ ПОЧТА</StyledFormLabel>
                </StyledFormFieldWrapper>
              </StyledFormRow>

              <StyledSubmitWrapper>
                <StyledSubmitDot />
                <StyledSubmitButton type="submit" disabled={formStatus === 'sending'} aria-label="Отправить заявку">
                  <span>
                    {formStatus === 'sending' ? 'ОТПРАВКА...' : formStatus === 'success' ? 'ОТПРАВЛЕНО' : 'ОТПРАВИТЬ'}
                  </span>
                </StyledSubmitButton>
              </StyledSubmitWrapper>

              {formStatus === 'error' && (
                <StyledFormStatus $error>Ошибка. Попробуйте позже.</StyledFormStatus>
              )}
            </form>
          </StyledFormSection>

          {/* ── Footer ── */}
          <StyledFooter>
            <StyledFooterText>
              телефон +7 (999) 999 99 99<br />
              почта: mail@example.com<br />
              адрес: Город город улица улица дом дом
            </StyledFooterText>
          </StyledFooter>

        </StyledFrame>
      </ScalableContent>
    </PageWrapper>
  )
}

export default AboutPage
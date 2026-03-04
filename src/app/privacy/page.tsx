import Link from "next/link";
import { SiteShell } from "@/widgets/site/ui/site-shell";

type SiteInfoType = {
  url: string;
  email: string;
};

const siteInfo: SiteInfoType = {
  url: "https://hubnity.eu",
  email: "info@hubnity.eu",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <div className="pt-32 container mx-auto mb-8">
        <h1 className="headline-lg text-2xl lg:text-4xl 3xl:text-5xl -mt-2 mb-8">
          Политика конфиденциальности
        </h1>

        <div className="md:border md:p-8 xl:p-10 space-y-8 bg-white">
          <h4 className="headline-md 2xl:text-3xl 3xl:text-4xl text-lg">
            Политика в отношении обработки персональных данных
          </h4>
          <div className="space-y-6">
            <div className="space-y-6">
              <h5 className="headline-semi-md text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
                1. Общие положения
              </h5>
              <p className="text-pretty text-gray-600">
                Настоящая политика обработки персональных данных составлена в
                соответствии с требованиями закона «О персональных данных» и
                определяет порядок обработки персональных данных и меры по
                обеспечению безопасности персональных данных (далее – Оператор).
              </p>
              <div className="space-y-4">
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">1.</div>
                  Оператор ставит своей важнейшей целью и условием осуществления
                  своей деятельности соблюдение прав и свобод человека и
                  гражданина при обработке его персональных данных, в том числе
                  защиты прав на неприкосновенность частной жизни, личную и
                  семейную тайну.
                </div>
                <div className="text-gray-600 flex">
                  <span className="pr-4 text-primary">2.</span>
                  <span>
                    Настоящая политика Оператора в отношении обработки
                    персональных данных (далее – Политика) применяется ко всей
                    информации, которую Оператор может получить о посетителях
                    веб-сайта{" "}
                    <Link
                      className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                      href={siteInfo.url}
                    >
                      {siteInfo.url}
                      <span className="text-gray-600">;</span>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="headline-semi-md xl:text-xl 2xl:text-2xl 3xl:text-3xl text-base">
                2. Основные понятия, используемые в Политике
              </h5>
              <div className="space-y-4">
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">1.</div>
                  Автоматизированная обработка персональных данных – обработка
                  персональных данных с помощью средств вычислительной техники;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">2.</div>
                  Блокирование персональных данных – временное прекращение
                  обработки персональных данных (за исключением случаев, если
                  обработка необходима для уточнения персональных данных);
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">3.</div>
                  <div>
                    Веб-сайт – совокупность графических и информационных
                    материалов, а также программ для ЭВМ и баз данных,
                    обеспечивающих их доступность в сети интернет по сетевому
                    адресу{" "}
                    <span>
                      <Link
                        className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                        href={siteInfo.url}
                      >
                        {siteInfo.url}
                      </Link>
                    </span>
                    ;
                  </div>
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">4.</div>
                  Информационная система персональных данных — совокупность
                  содержащихся в базах данных персональных данных и
                  обеспечивающих их обработку информационных технологий и
                  технических средств;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">5.</div>
                  Обезличивание персональных данных — действия, в результате
                  которых невозможно определить без использования дополнительной
                  информации принадлежность персональных данных конкретному
                  Пользователю или иному субъекту персональных данных;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">6.</div>
                  Обработка персональных данных – любое действие (операция) или
                  совокупность действий (операций), совершаемых с использованием
                  средств автоматизации или без использования таких средств с
                  персональными данными, включая сбор, запись, систематизацию,
                  накопление, хранение, уточнение (обновление, изменение),
                  извлечение, использование, передачу (распространение,
                  предоставление, доступ), обезличивание, блокирование,
                  удаление, уничтожение персональных данных;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">7.</div>
                  Оператор – государственный орган, муниципальный орган,
                  юридическое или физическое лицо, самостоятельно или совместно
                  с другими лицами организующие и (или) осуществляющие обработку
                  персональных данных, а также определяющие цели обработки
                  персональных данных, состав персональных данных, подлежащих
                  обработке, действия (операции), совершаемые с персональными
                  данными;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">8.</div>
                  <div>
                    Персональные данные – любая информация, относящаяся прямо
                    или косвенно к определенному или определяемому Пользователю
                    веб-сайта{" "}
                    <span>
                      <Link
                        className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                        href={siteInfo.url}
                      >
                        {siteInfo.url}
                      </Link>
                      <span className="inline-block">;</span>
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">9.</div>
                  <div>
                    Пользователь – любой посетитель веб-сайта{" "}
                    <span>
                      <Link
                        className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                        href={siteInfo.url}
                      >
                        {siteInfo.url}
                      </Link>
                    </span>
                    ;
                  </div>
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">10.</div>
                  Предоставление персональных данных – действия, направленные на
                  раскрытие персональных данных определенному лицу или
                  определенному кругу лиц;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">11.</div>
                  Распространение персональных данных – любые действия,
                  направленные на раскрытие персональных данных неопределенному
                  кругу лиц (передача персональных данных) или на ознакомление с
                  персональными данными неограниченного круга лиц, в том числе
                  обнародование персональных данных в средствах массовой
                  информации, размещение в информационно-телекоммуникационных
                  сетях или предоставление доступа к персональным данным
                  каким-либо иным способом;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">12.</div>
                  Трансграничная передача персональных данных – передача
                  персональных данных на территорию иностранного государства
                  органу власти иностранного государства, иностранному
                  физическому или иностранному юридическому лицу;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">13.</div>
                  Уничтожение персональных данных – любые действия, в результате
                  которых персональные данные уничтожаются безвозвратно с
                  невозможностью дальнейшего восстановления содержания
                  персональных данных в информационной системе персональных
                  данных и (или) результате которых уничтожаются материальные
                  носители персональных данных.
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="headline-semi-md xl:text-xl 2xl:text-2xl 3xl:text-3xl text-base">
                3. Оператор может обрабатывать следующие персональные данные
                Пользователя
              </h5>
              <div className="space-y-4">
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">1.</div>
                  Фамилия, имя, отчество;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">2.</div>
                  Электронный адрес;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">3.</div>
                  Номера телефонов;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">4.</div>
                  Год, месяц, дата и место рождения;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">5.</div>
                  Фотографии;
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">6.</div>
                  Также на сайте происходит сбор и обработка обезличенных данных
                  о посетителях (в т.ч. файлов «cookie») с помощью сервисов
                  интернет-статистики (Яндекс Метрика и Гугл Аналитика и
                  других).
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">7.</div>
                  Вышеперечисленные данные далее по тексту Политики объединены
                  общим понятием Персональные данные.
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="headline-semi-md xl:text-xl 2xl:text-2xl 3xl:text-3xl text-base">
                4. Цели обработки персональных данных
              </h5>
              <div className="space-y-4">
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">1.</div>
                  Цель обработки персональных данных Пользователя —
                  информирование Пользователя посредством отправки электронных
                  писем; предоставление доступа Пользователю к сервисам,
                  информации и/или материалам, содержащимся на веб-сайте.
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">2.</div>
                  <span>
                    Также Оператор имеет право направлять Пользователю
                    уведомления о новых продуктах и услугах, специальных
                    предложениях и различных событиях. Пользователь всегда может
                    отказаться от получения информационных сообщений, направив
                    Оператору письмо на адрес электронной почты{" "}
                    <Link
                      className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                      href="mailto:{siteInfo.email"
                    >
                      {siteInfo.email}
                    </Link>{" "}
                    с пометкой «Отказ от уведомлениях о новых продуктах и
                    услугах и специальных предложениях
                  </span>
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">3.</div>
                  Обезличенные данные Пользователей, собранные с помощью
                  сервисов интернет-статистики, служат для сбора информации о
                  действиях Пользователей на сайте, улучшения качества сайта и
                  его содержания.
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="headline-semi-md xl:text-xl 2xl:text-2xl 3xl:text-3xl text-base">
                5. Правовые основания обработки персональных данных
              </h5>
              <div className="space-y-4">
                <div className="flex">
                  <div className="pr-4 text-primary">1.</div>
                  <div className="text-gray-600">
                    Оператор обрабатывает персональные данные Пользователя
                    только в случае их заполнения и/или отправки Пользователем
                    самостоятельно через специальные формы, расположенные на
                    сайте{" "}
                    <Link
                      className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                      href={siteInfo.url}
                    >
                      {siteInfo.url}
                    </Link>
                    . Заполняя соответствующие формы и/или отправляя свои
                    персональные данные Оператору, Пользователь выражает свое
                    согласие с данной Политикой.
                  </div>
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">2.</div>
                  Оператор обрабатывает обезличенные данные о Пользователе в
                  случае, если это разрешено в настройках браузера Пользователя
                  (включено сохранение файлов «cookie» и использование
                  технологии JavaScript).
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="headline-semi-md xl:text-xl 2xl:text-2xl 3xl:text-3xl text-base">
                6. Порядок сбора, хранения, передачи и других видов обработки
                персональных данных
              </h5>
              <div className="space-y-4">
                <div>
                  Безопасность персональных данных, которые обрабатываются
                  Оператором, обеспечивается путем реализации правовых,
                  организационных и технических мер, необходимых для выполнения
                  в полном объеме требований действующего законодательства в
                  области защиты персональных данных.
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">1.</div>
                  Оператор обеспечивает сохранность персональных данных и
                  принимает все возможные меры, исключающие доступ к
                  персональным данным неуполномоченных лиц.
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">2.</div>
                  Персональные данные Пользователя никогда, ни при каких
                  условиях не будут переданы третьим лицам, за исключением
                  случаев, связанных с исполнением действующего
                  законодательства.
                </div>
                <div className="flex">
                  <div className="pr-4 text-primary">3.</div>
                  <div className="text-gray-600">
                    В случае выявления неточностей в персональных данных,
                    Пользователь может актуализировать их самостоятельно, путем
                    направления Оператору уведомления на адрес электронной почты
                    Оператора{" "}
                    <Link
                      className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                      href={siteInfo.email}
                    >
                      {siteInfo.email}
                    </Link>{" "}
                    с пометкой «Актуализация персональных данных».
                  </div>
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">4.</div>
                  <div>
                    Срок обработки персональных данных является неограниченным.
                    Пользователь может в любой момент отозвать свое согласие на
                    обработку персональных данных, направив Оператору
                    уведомление посредством электронной почты на электронный
                    адрес Оператора{" "}
                    <Link
                      className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                      href={siteInfo.email}
                    >
                      {siteInfo.email}
                    </Link>{" "}
                    с пометкой «Отзыв согласия на обработку персональных
                    данных».
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="headline-semi-md xl:text-xl 2xl:text-2xl 3xl:text-3xl text-base">
                7. Трансграничная передача персональных данных
              </h5>
              <div className="space-y-4">
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">1.</div>
                  Оператор до начала осуществления трансграничной передачи
                  персональных данных обязан убедиться в том, что иностранным
                  государством, на территорию которого предполагается
                  осуществлять передачу персональных данных, обеспечивается
                  надежная защита прав субъектов персональных данных.
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">2.</div>
                  Трансграничная передача персональных данных на территории
                  иностранных государств, не отвечающих вышеуказанным
                  требованиям, может осуществляться только в случае наличия
                  согласия в письменной форме субъекта персональных данных на
                  трансграничную передачу его персональных данных и/или
                  исполнения договора, стороной которого является субъект
                  персональных данных.
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="headline-semi-md xl:text-xl 2xl:text-2xl 3xl:text-3xl text-base">
                8. Заключительные положения
              </h5>
              <div className="space-y-4">
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">1.</div>
                  <div>
                    Пользователь может получить любые разъяснения по
                    интересующим вопросам, касающимся обработки его персональных
                    данных, обратившись к Оператору с помощью электронной почты{" "}
                    <span>
                      <Link
                        className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                        href={siteInfo.email}
                      >
                        {siteInfo.email}
                      </Link>
                      <span>;</span>
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 flex">
                  <div className="pr-4 text-primary">2.</div>В данном документе
                  будут отражены любые изменения политики обработки персональных
                  данных Оператором. Политика действует бессрочно до замены ее
                  новой версией.
                </div>
                <div className="flex">
                  <div className="pr-4 text-primary">3.</div>
                  <div className="text-gray-600">
                    Актуальная версия Политики в свободном доступе расположена в
                    сети Интернет по адресу{" "}
                    <span>
                      <Link
                        className="text-primary underline underline-offset-4 decoration-dashed decoration-1 lg:hover:opacity-50 transition-all"
                        href={`${siteInfo.url}/privacy`}
                      >
                        {siteInfo.url}/privacy
                      </Link>
                    </span>
                    ;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

import mechanize
import urllib
import BeautifulSoup
br = mechanize.Browser()
br.set_handle_equiv(True)
#br.set_handle_gzip(True)
br.set_handle_redirect(True)
br.set_handle_referer(True  )
br.set_handle_robots(False)
br.set_handle_refresh(mechanize._http.HTTPRefreshProcessor(), max_time=1)
#br.set_debug_http(True)
#br.set_debug_redirects(True)
#br.set_debug_responses(True)
br.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.3')]
username = 'uname'
password = 'pass'
response = br.open('http://user.tripleplay.in/Customer/Default.aspx')
br.select_form(nr=0)
br.form['ddlLogin'] = ['0',]
br.form['txtUserName'] = username
br.form['txtPassword'] = password
response1 = br.submit()
res = br.open('http://user.tripleplay.in/Customer/Gauge.aspx')
soup = BeautifulSoup.BeautifulSoup(res.read())
usage = soup.find('span', {'id':'lblCurrentUsage'}).string
days_left = soup.find('span', {'id':'lblValidityPeriod'}).string
status = soup.find('span', {'id':'spStatus'}).string
speed = soup.find('span', {'id':'lblPlanSpeed'}).string

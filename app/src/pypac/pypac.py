import zerorpc

class PyApi(object):
    def echo(self, text):
        """echo any text"""
        return text

def main():
    addr = 'tcp://127.0.0.1:4242'
    s = zerorpc.Server(PyApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()

if __name__ == '__main__':
    main()
